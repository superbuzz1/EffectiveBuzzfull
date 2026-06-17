import { Resend } from 'resend';
import { prisma } from '../prismaClient';

export interface EmailMessage {
  to: string;
  from: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  trackingId: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId: string;
  provider: string;
  error?: string;
}

export interface EmailProvider {
  name: string;
  sendEmail(message: EmailMessage): Promise<EmailSendResult>;
}

// Resend Implementation
export class ResendProvider implements EmailProvider {
  name = 'Resend';
  private resend: Resend | null;

  constructor(apiKey?: string) {
    this.resend = apiKey ? new Resend(apiKey) : null;
  }

  private injectTracking(message: EmailMessage): string {
    let html = message.bodyHtml;
    const trackingId = message.trackingId;
    
    // 1. Inject Open Tracking Pixel
    const pixel = `<img src="${process.env.APP_URL || 'https://api.effectivebuzz.online'}/api/track/open?tid=${trackingId}" width="1" height="1" alt="" style="display:none;" />`;
    html = html.replace('</body>', `${pixel}</body>`);
    if (!html.includes(pixel)) {
      html += pixel; // Fallback if no body tag
    }

    // 2. Inject Click Tracking Link Wrappers
    html = html.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g, (match, quote, url) => {
      // Don't wrap mailto or internal anchors
      if (url.startsWith('mailto:') || url.startsWith('#')) return match;
      const trackingUrl = `${process.env.APP_URL || 'https://api.effectivebuzz.online'}/api/track/click?tid=${trackingId}&url=${encodeURIComponent(url)}`;
      return `<a href="${trackingUrl}"`;
    });

    return html;
  }

  async sendEmail(message: EmailMessage): Promise<EmailSendResult> {
    if (!this.resend) {
      // Return dummy success if not configured
      console.log(`[EmailProvider - ${this.name}] DRY RUN send to ${message.to}`);
      return { success: true, messageId: `mock-${Date.now()}`, provider: this.name };
    }
    
    try {
      const processedHtml = this.injectTracking(message);

      const response = await this.resend.emails.send({
        from: message.from,
        to: message.to,
        subject: message.subject,
        html: processedHtml,
        text: message.bodyText,
        tags: [{ name: 'tracking_id', value: message.trackingId }]
      });

      if (response.error) {
        return { success: false, messageId: '', provider: this.name, error: response.error.message };
      }

      return { success: true, messageId: response.data?.id || '', provider: this.name };
    } catch (err: any) {
      return { success: false, messageId: '', provider: this.name, error: err.message };
    }
  }
}

// Simulated SendGrid Provider
export class SendGridProvider implements EmailProvider {
  name = 'SendGrid';
  
  async sendEmail(message: EmailMessage): Promise<EmailSendResult> {
    console.log(`[EmailProvider - ${this.name}] DRY RUN send to ${message.to}`);
    return { success: true, messageId: `sg-mock-${Date.now()}`, provider: this.name };
  }
}

// Resilient Pipeline Router
export class ResilientEmailRouter {
  private providers: EmailProvider[];

  constructor(providers: EmailProvider[]) {
    if (providers.length === 0) throw new Error("No email providers registered.");
    this.providers = providers;
  }

  async send(message: EmailMessage): Promise<EmailSendResult> {
    let lastError: Error | null = null;

    // Failover sequence
    for (const provider of this.providers) {
      try {
        const result = await provider.sendEmail(message);
        if (result.success) {
          return result;
        }
        lastError = new Error(result.error);
      } catch (err: any) {
        lastError = err;
        console.warn(`Provider ${provider.name} failed to dispatch email:`, err.message);
      }
    }
    throw new Error(`All email providers failed to dispatch email. Last error: ${lastError?.message}`);
  }
}

// Instantiate Global Service
export const emailRouter = new ResilientEmailRouter([
  new ResendProvider(process.env.RESEND_API_KEY),
  new SendGridProvider()
]);

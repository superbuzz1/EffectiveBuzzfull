import Stripe from 'stripe';
import { PlanCode } from '../types/billing';

export class BillingService {
  private static stripeClient: Stripe | null = null;

  public static getStripe(): Stripe {
    if (!this.stripeClient) {
      if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not set.");
      }
      this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-12-18.acacia' as any
      });
    }
    return this.stripeClient;
  }

  public static async createSubscriptionCheckout(tenantId: string, planCode: string, successUrl: string, cancelUrl: string) {
    const stripe = this.getStripe();
    
    const priceMap: Record<string, string> = {
      [PlanCode.STARTER]: process.env.STRIPE_PRICE_STARTER || 'price_starter',
      [PlanCode.GROWTH]: process.env.STRIPE_PRICE_GROWTH || 'price_growth',
      [PlanCode.SCALE]: process.env.STRIPE_PRICE_SCALE || 'price_scale',
      [PlanCode.ENTERPRISE]: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise',
    };

    const priceId = priceMap[planCode];
    if (!priceId) {
      throw new Error(`Invalid plan code: ${planCode}`);
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      client_reference_id: tenantId,
      metadata: {
        tenantId,
        planCode
      }
    });

    return session;
  }

  public static async meterUsage(subscriptionItemId: string, quantity: number, action: 'increment' | 'set' = 'increment') {
    const stripe = this.getStripe();
    const record = await (stripe.subscriptionItems as any).createUsageRecord(
      subscriptionItemId,
      {
        quantity,
        timestamp: Math.floor(Date.now() / 1000),
        action
      }
    );
    return record;
  }

  public static async getCredits(customerId: string) {
    const stripe = this.getStripe();
    const customer = await stripe.customers.retrieve(customerId);
    if (customer.deleted) {
      return 0;
    }
    return (customer as Stripe.Customer).balance || 0;
  }

  public static async deductCredits(customerId: string, amount: number, description: string) {
    const stripe = this.getStripe();
    const transaction = await stripe.customers.createBalanceTransaction(
      customerId,
      {
        amount: -amount,
        currency: 'usd', 
        description
      }
    );
    return transaction;
  }

  public static async handleWebhook(signature: string, payload: any) {
    const stripe = this.getStripe();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not set.");
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    } catch (err: any) {
      throw new Error(`Invalid signature or payload: ${err.message}`);
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const tenantId = session.metadata?.tenantId;
        const planCode = session.metadata?.planCode;
        console.log(`[Billing] Subscription created for tenant: ${tenantId}, plan: ${planCode}`);
        break;
      }
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`[Billing] Invoice paid: ${invoice.id}`);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        console.log(`[Billing] Subscription canceled: ${subscription.id}`);
        break;
      }
      default:
        console.log(`[Billing] Unhandled event type: ${event.type}`);
    }

    return { processed: true, eventType: event.type };
  }
}

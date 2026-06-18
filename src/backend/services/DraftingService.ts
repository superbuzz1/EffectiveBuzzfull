// src/backend/services/DraftingService.ts
import { GoogleGenAI, Type } from "@google/genai";
import { DatabaseClient } from "./PrismaService";

export interface DraftGenerationInput {
  contact: any;
  company: any;
  campaign: any;
  step: any;
  userContext?: string;
}

export class DraftingService {
  private static getAI() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set.");
    }
    return new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  /**
   * Generates a personalized outreach email draft using Gemini.
   */
  public static async generateDraft(input: DraftGenerationInput) {
    const ai = this.getAI();
    const { contact, company, campaign, step, userContext } = input;

    const systemPrompt = `
      You are a high-performing SDR (Sales Development Representative) at EffectiveBuzz.
      Your goal is to write a highly personalized, low-friction outreach email that starts a conversation.
      
      Guidelines:
      - Use a "curiosity-first" approach.
      - Keep it short (under 100 words).
      - Reference specific details about their company or role.
      - Avoid "salesy" language or generic compliments.
      - End with a simple, low-stakes question.
    `;

    const userPrompt = `
      Recipient: ${contact.firstName} ${contact.lastName}, ${contact.title} at ${company.name}.
      Company Context: ${JSON.stringify(company.enrichmentData || {})}
      Campaign Goal: ${campaign.name}
      Sequence Step: ${step.subject ? `Context: ${step.subject}` : 'Initial outreach'}
      Additional Context: ${userContext || 'None'}
      
      Instructions: Use the Company Context (meta-tags, hero text) to mention a specific value driver relevant to their current market positioning.
      
      Generate a "subject" line and the "body" of the email.
    `;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Using 2.0 Flash for speed and quality
        contents: [
          { role: 'user', parts: [{ text: systemPrompt }] },
          { role: 'user', parts: [{ text: userPrompt }] }
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              subject: { type: Type.STRING, description: "Email subject line" },
              body: { type: Type.STRING, description: "Personalized email body" }
            },
            required: ["subject", "body"]
          }
        }
      });

      const draft = JSON.parse(response.text?.trim() || '{}');
      return draft;
    } catch (err: any) {
      console.error("[DRAFTING_SERVICE_ERROR] Failed to generate draft:", err);
      throw new Error(`AI Generation failed: ${err.message}`);
    }
  }

  /**
   * Bulk generates drafts for multiple targets.
   */
  public static async generateBulkDrafts(targets: any[], campaign: any, step: any) {
    const results = [];
    for (const target of targets) {
      try {
        const draft = await this.generateDraft({
          contact: target.contact,
          company: target.contact.company,
          campaign,
          step
        });
        results.push({ targetId: target.id, ...draft });
      } catch (err) {
        results.push({ targetId: target.id, error: (err as Error).message });
      }
    }
    return results;
  }
}

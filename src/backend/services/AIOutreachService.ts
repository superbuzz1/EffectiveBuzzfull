import { GoogleGenAI, Type } from "@google/genai";

export class AIOutreachService {
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

  public static async generateColdEmail(prospect: any, company: any, sender: any, valueProposition: string) {
    const ai = this.getAI();
    const prompt = `
      Write a cold email to the following prospect.
      
      Prospect Information:
      ${JSON.stringify(prospect, null, 2)}
      
      Company Information:
      ${JSON.stringify(company, null, 2)}
      
      Sender Information:
      ${JSON.stringify(sender, null, 2)}
      
      Value Proposition:
      ${valueProposition}
      
      Provide a "subject" line and the "body" of the email. Keep it professional, concise, focused on value, and clear.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING, description: "Catchy and relevant subject line" },
            body: { type: Type.STRING, description: "The email body, formatted with line breaks" }
          },
          required: ["subject", "body"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }

  public static async generateFollowUp(previousEmail: string, daysSinceLastContact: number, additionalContext?: string) {
    const ai = this.getAI();
    let prompt = `
      Write a follow-up email based on the following previous email sent ${daysSinceLastContact} days ago.
      
      Previous Email:
      ${previousEmail}
    `;

    if (additionalContext) {
      prompt += `\nAdditional Context:\n${additionalContext}\n`;
    }

    prompt += `\nProvide a "subject" line (can be 'Re: [Previous Subject]') and the "body" of the email. Keep it brief and polite.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING, description: "Subject line for the follow-up" },
            body: { type: Type.STRING, description: "The email body, formatted with line breaks" }
          },
          required: ["subject", "body"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }

  public static async generateLinkedInMessage(prospect: any, sender: any, valueProposition: string) {
    const ai = this.getAI();
    const prompt = `
      Write a LinkedIn connection request or direct message to the following prospect.
      
      Prospect Information:
      ${JSON.stringify(prospect, null, 2)}
      
      Sender Information:
      ${JSON.stringify(sender, null, 2)}
      
      Value Proposition:
      ${valueProposition}
      
      Provide the "message" text. Keep it under 300 characters, friendly, and professional. Do not use a subject line.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: { type: Type.STRING, description: "The LinkedIn message text" }
          },
          required: ["message"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }
}

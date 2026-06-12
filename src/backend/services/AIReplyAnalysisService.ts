import { GoogleGenAI, Type } from "@google/genai";

export class AIReplyAnalysisService {
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

  public static async analyzeReply(replyBody: string, previousContext?: string) {
    const ai = this.getAI();
    let prompt = `
      Analyze the following email reply from a prospect.
      
      Reply Body:
      ${replyBody}
    `;

    if (previousContext) {
      prompt += `\nPrevious Context/Thread:\n${previousContext}\n`;
    }

    prompt += `
      Classify the intent of the reply strictly into one of the following categories:
      - "Interested" : Prospect shows generic interest to learn more.
      - "Objection" : Prospect raises a specific concern or objection (e.g. budget, timing, using competitor).
      - "Referral" : Prospect directs you to someone else in the organization.
      - "Not Interested" : Prospect explicitly rejects the outreach.
      - "Meeting Request" : Prospect explicitly asks to book a meeting or requests times.
      
      Provide the "classification", a brief "confidence" score (0-100), and a "suggestedNextStep".
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            classification: { 
              type: Type.STRING, 
              enum: ["Interested", "Objection", "Referral", "Not Interested", "Meeting Request"],
              description: "The primary classification of the reply content" 
            },
            confidence: { type: Type.INTEGER, description: "Confidence score between 0 and 100" },
            suggestedNextStep: { type: Type.STRING, description: "Actionable next step based on the classification" }
          },
          required: ["classification", "confidence", "suggestedNextStep"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }
}

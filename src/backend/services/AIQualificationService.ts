import { GoogleGenAI, Type } from "@google/genai";

export class AIQualificationService {
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

  public static async qualifyBANT(dealContext: any) {
    const ai = this.getAI();
    const prompt = `
      Evaluate the following deal context using the BANT (Budget, Authority, Need, Timeline) framework.
      
      Deal Context:
      ${JSON.stringify(dealContext, null, 2)}
      
      Provide a score (0-10) for each BANT category based on the provided context. 
      Also provide actionable recommendations and an assessment of whether the prospect is ready for a meeting.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scoring: {
              type: Type.OBJECT,
              properties: {
                budget: { type: Type.INTEGER, description: "Budget score 0-10" },
                authority: { type: Type.INTEGER, description: "Authority score 0-10" },
                need: { type: Type.INTEGER, description: "Need score 0-10" },
                timeline: { type: Type.INTEGER, description: "Timeline score 0-10" }
              },
              required: ["budget", "authority", "need", "timeline"]
            },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of actionable recommendations to improve qualification" },
            meetingReadiness: { type: Type.BOOLEAN, description: "Is the prospect qualified enough for a meeting?" }
          },
          required: ["scoring", "recommendations", "meetingReadiness"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }

  public static async qualifyMEDDIC(dealContext: any) {
    const ai = this.getAI();
    const prompt = `
      Evaluate the following deal context using the MEDDIC (Metrics, Economic Buyer, Decision Criteria, Decision Process, Identify Pain, Champion) framework.
      
      Deal Context:
      ${JSON.stringify(dealContext, null, 2)}
      
      Provide a score (0-10) for each MEDDIC category based on the provided context.
      Also provide actionable recommendations and an assessment of whether the prospect is ready for a meeting.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scoring: {
              type: Type.OBJECT,
              properties: {
                metrics: { type: Type.INTEGER, description: "Metrics score 0-10" },
                economicBuyer: { type: Type.INTEGER, description: "Economic Buyer score 0-10" },
                decisionCriteria: { type: Type.INTEGER, description: "Decision Criteria score 0-10" },
                decisionProcess: { type: Type.INTEGER, description: "Decision Process score 0-10" },
                identifyPain: { type: Type.INTEGER, description: "Identify Pain score 0-10" },
                champion: { type: Type.INTEGER, description: "Champion score 0-10" }
              },
              required: ["metrics", "economicBuyer", "decisionCriteria", "decisionProcess", "identifyPain", "champion"]
            },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of actionable recommendations to improve qualification" },
            meetingReadiness: { type: Type.BOOLEAN, description: "Is the prospect qualified enough for a meeting?" }
          },
          required: ["scoring", "recommendations", "meetingReadiness"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }
}

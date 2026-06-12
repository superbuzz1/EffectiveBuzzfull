import { GoogleGenAI, Type } from "@google/genai";

export class LeadScoringService {
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

  public static async scoreLead(company: any, prospect: any, industry: any) {
    const ai = this.getAI();
    const prompt = `
      Evaluate the following lead out of 100 based on B2B sales potential:
      
      Company Information:
      ${JSON.stringify(company, null, 2)}
      
      Prospect Information:
      ${JSON.stringify(prospect, null, 2)}
      
      Industry Information:
      ${JSON.stringify(industry, null, 2)}
      
      Provide a "score" (0-100), a "reasoning" string explaining the score, and an array of "recommendations" on how to approach this lead.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Lead score between 0 and 100" },
            reasoning: { type: Type.STRING, description: "Detailed reasoning for the score" },
            recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of actionable recommendations for outreach" }
          },
          required: ["score", "reasoning", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }
}

import { GoogleGenAI, Type } from "@google/genai";

export class AIResearchService {
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

  public static async researchCompany(companyName: string) {
    const ai = this.getAI();
    const prompt = `Research the company named "${companyName}". Provide a summary, their key products or services, main competitors, and recent news or notable events.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A brief summary of the company." },
            keyProducts: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of key products or services." },
            competitors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of main competitors." },
            recentNews: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of recent news or notable events." }
          },
          required: ["summary", "keyProducts", "competitors", "recentNews"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }

  public static async researchProspect(prospectName: string, companyName?: string) {
    const ai = this.getAI();
    let prompt = `Research the professional background of "${prospectName}"`;
    if (companyName) {
      prompt += ` who works at "${companyName}"`;
    }
    prompt += `. Give a brief background, potential ice breakers for outreach, and likely priorities in their role.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            background: { type: Type.STRING, description: "Professional background summary." },
            iceBreakers: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of potential ice breakers for a cold email." },
            priorities: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Likely professional priorities." }
          },
          required: ["background", "iceBreakers", "priorities"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }

  public static async researchIndustry(industryName: string) {
    const ai = this.getAI();
    const prompt = `Provide an overview of the "${industryName}" industry. Include key trends, major challenges, and the current estimated market size or growth trajectory.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            trends: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Current industry trends." },
            challenges: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Current industry challenges." },
            marketSize: { type: Type.STRING, description: "Estimated market size and growth trajectory." }
          },
          required: ["trends", "challenges", "marketSize"]
        }
      }
    });

    return JSON.parse(response.text?.trim() || '{}');
  }
}

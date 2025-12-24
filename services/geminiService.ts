
import { GoogleGenAI, Chat } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const createExhibitionChat = (): Chat => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are a high-end Exhibition Success Consultant. 
      Your goal is to help clients maximize their brand impact within their chosen exhibition space.
      Do not discuss technical discount percentages or specific "per square meter" price drops. 
      Instead, focus on the value of the total investment, space optimization, and booth design strategies that drive engagement.
      Help them understand that larger spaces offer better economies of scale for their brand presence.
      Be inspiring, professional, and focused on the client's marketing goals.`,
    },
  });
};

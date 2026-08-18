import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (
  message: string, 
  history: { role: 'user' | 'model'; content: string }[]
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    // Format history for Gemini SDK
    // Note: In a real app, we would manage full chat session state.
    // Here we treat it as single turn with context for simplicity in this demo structure,
    // or we could use ai.chats.create() if we persisted the object.
    
    // Let's use the chat capability for better context retention
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: `You are an AI Assistant for a Senior UI/UX Designer's portfolio website called "OS Portfolio". 
        Your persona is professional, creative, and slightly witty.
        The designer is an expert in React, TypeScript, Tailwind CSS, Figma, and Motion Design.
        
        Answer questions about:
        1. The designer's skills (Frontend Dev + UI Design).
        2. Availability (Currently open for freelance).
        3. Contact info (email: hello@designer.os).
        
        Keep answers concise and helpful. If asked to show work, tell them to click the "Projects" icon on the desktop.`,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.content }]
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text || "Извините, я не могу ответить прямо сейчас.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Произошла ошибка связи с AI сервисом. Пожалуйста, проверьте API ключ.";
  }
};
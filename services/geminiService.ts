
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getSecurityAdvice = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: userPrompt,
      config: {
        systemInstruction: `You are a world-class Cybersecurity Consultant named ShieldGuard AI. 
        Your mission is to educate users on protecting their mobile privacy and digital identity. 
        
        STRICT POLICY:
        1. If a user asks how to "hack," "access," or "spy" on someone else's phone, messages, or accounts, you MUST refuse.
        2. Instead, explain the technique they mentioned (e.g., SIM swapping, proximity sniffing, OSINT via phone number) from a DEFENSIVE perspective.
        3. Explain how an attacker might attempt such an action and, most importantly, provide detailed steps for how the USER can protect THEIR OWN data from such an attack.
        4. Focus on:
           - SIM Porting protection
           - Hardware keys (YubiKey) vs SMS 2FA
           - Data breach awareness (HIBP)
           - Privacy settings for social media
        
        Keep responses professional, ethical, and high-quality. Use Markdown.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to the security mainframe. Please check your connection and try again.";
  }
};

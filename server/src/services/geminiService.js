import { GoogleGenerativeAI } from '@google/generative-ai'

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// geminiService.js
export async function getGeminiResponse(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
    let attempts = 0;
    const maxAttempts = 3;
  
    while (attempts < maxAttempts) {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      } catch (error) {
        if (error.status === 503) {
          attempts++;
          console.log(`Retrying... attempt ${attempts}`);
          await new Promise(res => setTimeout(res, 2000)); // wait 2 sec
        } else {
          console.error("Gemini Chat Error:", error);
          throw new Error("Gemini API failed");
        }
      }
    }
  
    throw new Error("Gemini is overloaded. Try again later.");
  }
  
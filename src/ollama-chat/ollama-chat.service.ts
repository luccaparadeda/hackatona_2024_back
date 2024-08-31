import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import * as fs from "fs";

@Injectable()
export class OllamaChatService {
  async chatWithAI() {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const image: Part = {
      inlineData: {
        data: Buffer.from(fs.readFileSync("./gemini.pdf")).toString("base64"),
        mimeType: "application/pdf",
      },
    };

    const prompt = "Read the attached PDF and summarize it in 3-4 sentences.";

    const result = await model.generateContent([prompt, image]);
    console.log(result.response.text());
  }
}

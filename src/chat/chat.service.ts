import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class ChatService {
  // private readonly image: Part;

  // constructor() {
  //   const imageData = Buffer.from(fs.readFileSync("./gemini.pdf")).toString(
  //     "base64",
  //   );
  //   this.image = {
  //     inlineData: {
  //       data: imageData,
  //       mimeType: "application/pdf",
  //     },
  //   };
  // }
  async chatWithAI(
    prompt: string,
    history: string = "",
    // chat_category: string = "general",
  ) {
    // const chat_category_pdfs = fs.readdirSync(`./data/${chat_category}`);
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent([
      `${history} ${prompt}`,
      // this.image,
    ]);
    return result.response.text();
  }
}

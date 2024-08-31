import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as fs from "fs";

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
    chat_category: string,
  ) {
    try {
      const folderPath = `./data/${chat_category}`;
      const files = fs.readdirSync(folderPath, {
        withFileTypes: true,
      });

      const filePromises = files.map(async (file) => {
        const filePath = `${folderPath}/${file.name}`;

        const fileData = await fs.promises.readFile(filePath);
        const blob = Buffer.from(fileData).toString("base64"); // Adjust MIME type if needed
        return { filePath, blob };
      });

      const chat_category_pdfs = await Promise.all(filePromises);
      const attatchments = chat_category_pdfs.map((pdf) => {
        return {
          inlineData: {
            data: pdf.blob,
            mimeType: "application/pdf",
          },
        };
      });
      const genAI = new GoogleGenerativeAI(process.env.API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent([
        `UTILIZE OS PDFS QUE ESTÃO SENDO DISPONIBILIZADOS, SEMPRE UTILIZE ELES PARA BASEAR A SUA RESPOSTA, POREM NUNCA EM HIPOTESE ALGUMA DIGA QUE VOCE FOI ALIMENTADO POR PDFS. ${history} ${prompt}`,
        ...attatchments,
      ]);
      return result.response.text();
    } catch (e) {
      console.error(e);
      return "Erro ao se comunicar com a IA.";
    }
  }
}

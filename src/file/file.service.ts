import { Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class FileService {
  async downloadFile(file: Express.Multer.File, category: string) {
    try {
      console.log(file);
      if (!fs.existsSync(`./data/${category}`)) {
        fs.mkdirSync(`./data/${category}`);
      }
      fs.writeFileSync(`./data/${category}/${file.originalname}`, file.buffer);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteFile(category: string, fileName: string) {
    try {
      fs.unlinkSync(`./data/${category}/${fileName}`);
    } catch (e) {
      return e;
    }
  }

  async getFiles(category: string) {
    try {
      const files = fs.readdirSync(`./data/${category}`);
      return files;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return [];
    }
  }
}

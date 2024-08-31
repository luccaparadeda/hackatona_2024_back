import { Injectable } from "@nestjs/common";
import * as fs from "fs";

@Injectable()
export class FileService {
  async downloadFile(file: Express.Multer.File, category: string) {
    console.log(file);
    if (!fs.existsSync(`./data/${category}`)) {
      fs.mkdirSync(`./data/${category}`);
    }
    fs.writeFileSync(`./data/${category}/${file.originalname}`, file.buffer);
  }

  async deleteFile(category: string, fileName: string) {
    fs.unlinkSync(`./data/${category}/${fileName}`);
  }

  async getFiles(category: string) {
    const files = fs.readdirSync(`./data/${category}`);
    return files;
  }
}

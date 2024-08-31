import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody } from "@nestjs/swagger";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("/upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body("category") category: string,
  ) {
    return this.fileService.downloadFile(file, category);
  }

  @Post("/delete")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          example: "chuvas_intensas",
        },
        fileName: {
          type: "string",
          example: "chuvas_intensas.pdf",
        },
      },
    },
  })
  async deleteFile(
    @Body("category") category: string,
    @Body("fileName") fileName: string,
  ) {
    return this.fileService.deleteFile(category, fileName);
  }

  @Post("/list")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          example: "chuvas_intensivas",
        },
      },
    },
  })
  async getFiles(@Body("category") category: string) {
    return this.fileService.getFiles(category);
  }
}

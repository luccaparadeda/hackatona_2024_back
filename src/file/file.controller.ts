import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from "@nestjs/swagger";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("/upload")
  @ApiOperation({
    summary: "Upload a file",
    description: "Upload a file along with its category.",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
          description: "The file to upload.",
        },
        category: {
          type: "string",
          example: "chuvas_intensivas",
          description: "The category of the file being uploaded.",
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: "File uploaded successfully." })
  @ApiResponse({
    status: 400,
    description: "Invalid file or category provided.",
  })
  @ApiResponse({ status: 500, description: "Internal server error." })
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body("category") category: string,
  ) {
    return this.fileService.downloadFile(file, category);
  }

  @Post("/delete")
  @ApiOperation({
    summary: "Delete a file",
    description: "Delete a file based on the specified category and file name.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          example: "chuvas_intensivas",
          description:
            "The category of the file to delete. This should be a string representing the category name.",
        },
        fileName: {
          type: "string",
          example: "example.pdf",
          description:
            "The name of the file to delete. This should be a string representing the file name.",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "File deleted successfully." })
  @ApiResponse({
    status: 400,
    description: "Invalid category or file name provided.",
  })
  @ApiResponse({ status: 500, description: "Internal server error." })
  async deleteFile(
    @Body("category") category: string,
    @Body("fileName") fileName: string,
  ) {
    return this.fileService.deleteFile(category, fileName);
  }

  @Post("/list")
  @ApiOperation({
    summary: "Get files by category",
    description: "Retrieve a list of files based on the specified category.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        category: {
          type: "string",
          example: "chuvas_intensivas",
          description:
            "The category of files to retrieve. This should be a string representing the category name.",
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: "Files retrieved successfully." })
  @ApiResponse({ status: 400, description: "Invalid category provided." })
  @ApiResponse({ status: 500, description: "Internal server error." })
  async getFiles(@Body("category") category: string) {
    return this.fileService.getFiles(category);
  }
}

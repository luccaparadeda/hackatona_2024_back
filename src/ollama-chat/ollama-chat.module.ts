import { Module } from "@nestjs/common";
import { OllamaChatService } from "./ollama-chat.service";
import { OllamaChatController } from "./ollama-chat.controller";
import { PrismaService } from "src/database/database.service";

@Module({
  controllers: [OllamaChatController],
  providers: [OllamaChatService, PrismaService],
})
export class OllamaChatModule {}

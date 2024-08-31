import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/database.service";
import { ChatService } from "./chat.service";
import { OllamaChatController } from "./chat.controller";

@Module({
  controllers: [OllamaChatController],
  providers: [ChatService, PrismaService],
})
export class ChatModule {}

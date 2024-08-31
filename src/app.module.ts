import { Module } from "@nestjs/common";
import { OllamaChatModule } from "./ollama-chat/ollama-chat.module";

@Module({
  imports: [OllamaChatModule],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { OllamaChatModule } from "./ollama-chat/ollama-chat.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [OllamaChatModule, CategoryModule],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ChatModule } from "./chat/chat.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [ChatModule, CategoryModule],
})
export class AppModule {}

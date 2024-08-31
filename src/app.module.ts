import { Module } from "@nestjs/common";
import { ChatModule } from "./chat/chat.module";
import { CategoryModule } from "./category/category.module";
import { FileModule } from "./file/file.module";

@Module({
  imports: [ChatModule, CategoryModule, FileModule],
})
export class AppModule {}

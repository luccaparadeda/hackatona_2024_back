import { Module } from "@nestjs/common";
import { ChatModule } from "./chat/chat.module";
import { CategoryModule } from "./category/category.module";
import { FileModule } from "./file/file.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [ChatModule, CategoryModule, FileModule, AuthModule, UsersModule],
})
export class AppModule {}

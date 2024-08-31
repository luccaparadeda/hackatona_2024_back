import { Module } from "@nestjs/common";
import { CategoryModule } from "./category/category.module";
import { FileModule } from "./file/file.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ChatModule } from "./chat/chat.module";

@Module({
  imports: [
    ChatModule,
    CategoryModule,
    FileModule,
    AuthModule,
    UsersModule,
    CategoryModule,
  ],
})
export class AppModule {}

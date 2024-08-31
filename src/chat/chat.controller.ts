import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";

@Controller("ollama-chat")
@ApiTags("chat")
export class OllamaChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiBody({
    schema: {
      type: "object",
      properties: {
        history: { type: "string" },
        prompt: { type: "string" },
        chat_category: { type: "string" },
      },
      example: {
        history: "Hello",
        prompt: "How are you?",
        chat_category: "chuvas_intensivas",
      },
    },
  })
  @Post("/")
  async chat(
    @Body()
    {
      history,
      prompt,
      chat_category = "chuvas_intensivas",
    }: {
      history: string;
      prompt: string;
      chat_category: string;
    },
  ) {
    return this.chatService.chatWithAI(prompt, history, chat_category);
  }
}

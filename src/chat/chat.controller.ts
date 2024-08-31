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
      },
      example: {
        history: "Hello",
        prompt: "How are you?",
      },
    },
  })
  @Post("/")
  async chat(@Body() { history, prompt }: { history: string; prompt: string }) {
    return this.chatService.chatWithAI(prompt, history);
  }
}

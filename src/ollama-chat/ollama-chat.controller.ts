import { Controller, Get } from "@nestjs/common";
import { OllamaChatService } from "./ollama-chat.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("ollama-chat")
@ApiTags("chat")
export class OllamaChatController {
  constructor(private readonly ollamaChatService: OllamaChatService) {}

  @Get()
  async chat() {
    return "aaa";
  }
}

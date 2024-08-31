import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ChatService } from "./chat.service";

@Controller("ollama-chat")
@ApiTags("chat")
export class OllamaChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post("/")
  @ApiOperation({
    summary: "Chat with AI",
    description:
      "Send a chat prompt and history to the AI and receive a response.",
  })
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        history: {
          type: "string",
          example: "User: Hello\nAI: Hi there!",
          description:
            "The chat history as a string, with each message separated by a newline.",
        },
        prompt: {
          type: "string",
          example: "What is the weather like today?",
          description: "The prompt or question to send to the AI.",
        },
        chat_category: {
          type: "string",
          example: "chuvas_intensas",
          description:
            'The category of the chat, defaulting to "chuvas_intensivas".',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "AI response received successfully.",
  })
  @ApiResponse({ status: 400, description: "Invalid input provided." })
  @ApiResponse({ status: 500, description: "Internal server error." })
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

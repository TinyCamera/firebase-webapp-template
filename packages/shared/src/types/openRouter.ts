export interface OpenRouterConfig {
  apiKey: string;
  baseUrl: string;
  defaultModel: string;
}

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
  function_call?: {
    name: string;
    arguments: string;
  };
}

export interface ChatCompletionRequest {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
  response_format?: Record<string, any>;
}

export interface ChatCompletionResponse {
  choices: {
    message: ChatMessage;
    finish_reason: string;
  }[];
}

export class OpenRouterError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = "OpenRouterError";
  }
}

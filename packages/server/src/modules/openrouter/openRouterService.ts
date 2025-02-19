import {
  OpenRouterConfig,
  ChatCompletionRequest,
  ChatCompletionResponse,
  OpenRouterError,
} from "@firebase-webapp-template/shared";

export class OpenRouterService {
  constructor(private config: OpenRouterConfig) {
    if (!config.apiKey) {
      throw new OpenRouterError("OpenRouter API key is required");
    }
  }

  get defaultModel(): string {
    return this.config.defaultModel;
  }

  private async makeRequest(endpoint: string, body: any): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "HTTP-Referer": "https://your-app-domain.com", // Replace with your app's domain
          "X-Title": "Your App Name", // Replace with your app's name
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new OpenRouterError(
          `OpenRouter API error: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof OpenRouterError) {
        throw error;
      }
      console.error(error);
      throw new OpenRouterError(
        `Failed to connect to OpenRouter API: ${(error as Error).message}`
      );
    }
  }

  async createChatCompletion(
    request: ChatCompletionRequest
  ): Promise<ChatCompletionResponse> {
    const model = request.model || this.config.defaultModel;
    const body = {
      ...request,
      model,
    };

    return await this.makeRequest("/chat/completions", body);
  }

  async createCompletion(prompt: string, model?: string): Promise<string> {
    const response = await this.createChatCompletion({
      model: model || this.config.defaultModel,
      messages: [{ role: "user", content: prompt }],
    });

    if (!response.choices?.[0]?.message?.content) {
      throw new OpenRouterError("No completion generated");
    }

    return response.choices[0].message.content;
  }
}

import { createOpenRouter } from "@openrouter/ai-sdk-provider";

/**
 * OpenRouter AI client configuration
 */
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

/**
 * Default model for chat interactions
 * Model is configured via CHAT_MODEL environment variable
 */
export const chatModel = openrouter(process.env.CHAT_MODEL!);

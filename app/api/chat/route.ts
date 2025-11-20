import { streamText, convertToModelMessages, UIMessage, stepCountIs } from "ai";
import { chatModel } from "@/lib/ai/client";
import { searchDocumentation } from "./tools";
import { systemPrompt } from "./prompt";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: chatModel,
    system: systemPrompt,
    messages: convertToModelMessages(messages),
    tools: {
      searchDocumentation,
    },
    stopWhen: stepCountIs(5),
  });

  return result.toUIMessageStreamResponse();
}

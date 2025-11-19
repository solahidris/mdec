import { streamText, convertToModelMessages, UIMessage } from "ai";
import { chatModel } from "@/lib/ai/client";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: chatModel,
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

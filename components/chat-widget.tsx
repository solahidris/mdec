"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";

const SUGGESTED_QUESTIONS = [
  "What are the eligibility requirements?",
  "How do I apply for DE Rantau?",
  "What documents do I need?",
] as const;

export function ChatWidget() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    if (!hasText) return;

    sendMessage({ text: message.text || "" });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-[450px] h-[600px] flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Floating Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-10 p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Messages */}
            <Conversation className="flex-1 pt-16">
              <ConversationContent className="gap-4">
                {messages.length === 0 && (
                  <div className="flex flex-col justify-center h-full px-4 space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-foreground">
                        Hello! 👋
                      </h2>
                      <p className="text-base text-foreground">
                        Ask me anything related to MDEC programmes.
                      </p>
                    </div>

                    <div className="space-y-2">
                      {SUGGESTED_QUESTIONS.map((question) => (
                        <Button
                          key={question}
                          onClick={() => {
                            sendMessage({ text: question });
                          }}
                          variant="outline"
                          className="w-full justify-start h-auto px-4 py-3 text-sm bg-secondary/40 hover:bg-secondary/60 border-border font-normal"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((m) => (
                  <Message
                    key={m.id}
                    from={m.role}
                    className={m.role === "assistant" ? "max-w-full" : ""}
                  >
                    <MessageContent
                      className={m.role === "assistant" ? "w-full" : ""}
                    >
                      {m.parts.map((part, partIndex) => {
                        if (part.type === "text") {
                          return (
                            <MessageResponse key={partIndex}>
                              {part.text}
                            </MessageResponse>
                          );
                        }
                        return null;
                      })}
                    </MessageContent>
                  </Message>
                ))}

                {status === "submitted" && (
                  <Message from="assistant" className="max-w-full">
                    <MessageContent className="w-full">
                      <Shimmer duration={2}>Thinking...</Shimmer>
                    </MessageContent>
                  </Message>
                )}
              </ConversationContent>
              <ConversationScrollButton />
            </Conversation>

            {/* Input */}
            <div className="p-4 border-border bg-background/50">
              <PromptInput
                onSubmit={handleSubmit}
                className="border border-border focus-within:border-border focus-within:ring-[0.5px] focus-within:ring-border/50 rounded-xl shadow-none bg-secondary"
              >
                <PromptInputBody>
                  <PromptInputTextarea
                    placeholder="Type a message..."
                    className="min-h-[52px] py-4"
                  />
                </PromptInputBody>
                <PromptInputSubmit status={status} className="mr-1" />
              </PromptInput>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-xl shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Ask MDEC AI</span>
        </motion.button>
      )}
    </>
  );
}

"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Plus } from "lucide-react";
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
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/ui/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { ArrowUp, Square, Loader2, Book } from "lucide-react";

const SUGGESTED_QUESTIONS = [
  "What are the eligibility requirements for MTEP?",
  "How do I apply for DE Rantau as a foreigner?",
  "What documents do I need for Expats service as an MD company?",
] as const;

export function ChatWidget() {
  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
  });
  const [isOpen, setIsOpen] = useState(false);

  const [input, setInput] = useState("");
  const isLoading = status === "submitted";

  const handleSubmit = () => {
    sendMessage({ text: input });
    setInput("");
  };

  const handleValueChange = (value: string) => {
    setInput(value);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2 w-[90vw] max-w-[450px] justify-between"
            >
              {messages.length > 0 ? (
                <button
                  onClick={handleNewChat}
                  className="flex items-center gap-2 px-3 py-2 bg-background hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground border border-border shadow-lg text-sm font-medium"
                  title="New Chat"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Chat</span>
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 bg-background hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground border border-border shadow-lg"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[90vw] max-w-[450px] h-[600px] flex flex-col bg-background border border-border rounded-lg shadow-2xl overflow-hidden"
            >
              {/* Messages */}
              <Conversation className="flex-1">
                <ConversationContent
                  className={
                    messages.length === 0
                      ? "h-full flex items-center justify-center"
                      : "gap-4 pt-4"
                  }
                >
                  {messages.length === 0 && (
                    <div className="flex flex-col px-4 space-y-6 w-full">
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
                            className="w-full justify-start h-auto px-4 py-3 text-sm bg-secondary/40 hover:bg-secondary/60 border-border font-normal whitespace-normal text-left"
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

                          // Handle tool invocations that appear as parts with type starting with "tool-"
                          if (part.type.startsWith("tool-")) {
                            const toolInvocation = part as any;
                            const toolName =
                              toolInvocation.toolName ||
                              part.type.replace("tool-", "");
                            const isFinished =
                              toolInvocation.state === "result" ||
                              toolInvocation.state === "output-available" ||
                              toolInvocation.state === "done"; // "done" seen in logs for step-start/end but checking just in case
                            const args =
                              toolInvocation.args || toolInvocation.input || {};
                            const result =
                              toolInvocation.result || toolInvocation.output;

                            // Skip if it's just a step marker without tool data, though logs show tool-searchDocumentation has data
                            if (!toolName) return null;

                            return (
                              <div
                                key={partIndex}
                                className="mb-2 flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                {isFinished ? (
                                  <Book className="size-4" />
                                ) : (
                                  <Loader2 className="size-4 animate-spin" />
                                )}
                                <div className="flex-1">
                                  {!isFinished ? (
                                    <Shimmer duration={2}>
                                      {toolName === "searchDocumentation"
                                        ? "Reading Knowledge Base..."
                                        : `Calling ${toolName}...`}
                                    </Shimmer>
                                  ) : (
                                    <span className="flex items-center gap-1">
                                      {toolName === "searchDocumentation"
                                        ? "Read Knowledge Base"
                                        : `Called ${toolName}`}
                                      {result && (
                                        <span className="text-xs bg-secondary px-1.5 py-0.5 rounded-full">
                                          {result.totalFound} results
                                        </span>
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
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
                        <Shimmer duration={3}>Thinking...</Shimmer>
                      </MessageContent>
                    </Message>
                  )}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>

              {/* Input */}
              <div className="p-4 border-border bg-background/50">
                <PromptInput
                  value={input}
                  onValueChange={handleValueChange}
                  isLoading={isLoading}
                  onSubmit={handleSubmit}
                  className="w-full max-w-(--breakpoint-md)"
                >
                  <PromptInputTextarea placeholder="Ask me anything..." />
                  <PromptInputActions className="justify-end pt-2">
                    <PromptInputAction
                      tooltip={isLoading ? "Stop generation" : "Send message"}
                    >
                      <Button
                        variant="default"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        onClick={handleSubmit}
                      >
                        {isLoading ? (
                          <Square className="size-5 fill-current" />
                        ) : (
                          <ArrowUp className="size-5" />
                        )}
                      </Button>
                    </PromptInputAction>
                  </PromptInputActions>
                </PromptInput>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm font-medium">Ask MDEC AI</span>
        </motion.button>
      )}
    </>
  );
}

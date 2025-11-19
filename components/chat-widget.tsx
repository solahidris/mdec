"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X, Send } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput("");
    }
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
            className="fixed bottom-4 right-4 z-50 w-[90vw] max-w-[400px] h-[calc(100vh-2rem)] flex flex-col bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
              <div>
                <h3 className="font-semibold text-sm text-foreground">
                  MDEC Assistant
                </h3>
                <p className="text-xs text-muted-foreground">
                  Ask me anything about MDEC programmes
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-secondary rounded-full transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-8 opacity-50">
                  <p className="text-sm text-muted-foreground">
                    Ask me anything related to MDEC programmes.
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn(
                    "flex w-full",
                    m.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "p-3 rounded-2xl text-sm shadow-sm max-w-[80%]",
                      m.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-tr-none"
                        : "bg-background text-foreground border border-border rounded-tl-none"
                    )}
                  >
                    {m.parts.map((part, partIndex) => {
                      if (part.type === 'text') {
                        return <span key={partIndex}>{part.text}</span>;
                      }
                      return null;
                    })}
                  </div>
                </div>
              ))}
              {status === "submitted" && (
                <div className="flex justify-start w-full">
                  <div className="bg-background p-3 rounded-2xl rounded-tl-none border border-border flex items-center gap-1 max-w-[80%]">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t border-border bg-background/50"
            >
              <div className="relative flex items-center">
                <input
                  className="w-full px-4 py-3 pr-12 bg-secondary border-transparent focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-xl outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  disabled={status !== "ready"}
                />
                <button
                  type="submit"
                  disabled={status !== "ready" || !input.trim()}
                  className="absolute right-2 p-2 bg-primary hover:opacity-90 disabled:opacity-50 text-primary-foreground rounded-lg transition-opacity"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
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

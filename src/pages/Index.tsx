import { useEffect, useRef } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { TechArchitecture } from "@/components/TechArchitecture";
import { useChat } from "@/hooks/useChat";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ChatHeader onClearChat={clearChat} messageCount={messages.length} />

      <main className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-6">
            {messages.length === 0 ? (
              <div className="space-y-8 animate-fade-in">
                <div className="text-center py-12">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">
                    Welcome! How can I help you?
                  </h2>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                    I'm Julia's AI assistant. Ask me about her professional experience, 
                    technical projects, ML/GenAI expertise, or product leadership background.
                  </p>
                  
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {[
                      "What's Julia's background?",
                      "Tell me about her ML projects",
                      "What industries has she worked in?",
                      "Leadership experience?",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => sendMessage(suggestion)}
                        className="rounded-full border border-border bg-card px-4 py-2 text-sm text-foreground shadow-soft transition-all hover:bg-secondary hover:shadow-medium"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <TechArchitecture />
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
      </main>

      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;

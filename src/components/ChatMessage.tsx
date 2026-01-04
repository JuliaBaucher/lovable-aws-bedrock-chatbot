import { cn } from "@/lib/utils";

export type MessageRole = "user" | "assistant" | "error";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isError = message.role === "error";

  return (
    <div
      className={cn(
        "flex w-full animate-slide-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 shadow-soft md:max-w-[70%]",
          isUser && "bg-chat-user text-chat-user-foreground rounded-br-md",
          !isUser && !isError && "bg-chat-assistant text-chat-assistant-foreground rounded-bl-md",
          isError && "bg-chat-error text-chat-error-foreground rounded-bl-md border border-destructive/20"
        )}
      >
        <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">
          {message.content}
        </p>
        <time
          className={cn(
            "mt-1.5 block text-[11px] opacity-60",
            isUser ? "text-right" : "text-left"
          )}
        >
          {message.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
}

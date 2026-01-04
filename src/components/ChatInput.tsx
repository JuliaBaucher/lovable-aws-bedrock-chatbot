import { useState, useRef, useCallback } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 4000;

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const charCount = value.length;
  const isOverLimit = charCount > MAX_CHARS;
  const isEmpty = value.trim().length === 0;

  const handleSubmit = useCallback(() => {
    if (isEmpty || isOverLimit || disabled) return;
    onSend(value.trim());
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, isEmpty, isOverLimit, disabled, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
  };

  return (
    <div className="border-t border-border bg-card p-4">
      <div className="mx-auto max-w-3xl">
        <div
          className={cn(
            "flex items-end gap-3 rounded-xl border bg-background p-2 shadow-soft transition-all focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            isOverLimit && "border-destructive focus-within:ring-destructive"
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask about experience, projects, ML/GenAI..."
            disabled={disabled}
            rows={1}
            aria-label="Message input"
            className="flex-1 resize-none bg-transparent px-2 py-2 text-[15px] placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button
            onClick={handleSubmit}
            disabled={isEmpty || isOverLimit || disabled}
            size="icon"
            aria-label="Send message"
            className="h-10 w-10 shrink-0 rounded-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-xs text-muted-foreground">
            Press Enter to send, Shift+Enter for new line
          </span>
          <span
            className={cn(
              "text-xs transition-colors",
              isOverLimit ? "text-destructive font-medium" : "text-muted-foreground"
            )}
          >
            {charCount}/{MAX_CHARS}
          </span>
        </div>
        {isOverLimit && (
          <p className="mt-1 text-xs text-destructive animate-fade-in">
            Message exceeds maximum character limit
          </p>
        )}
      </div>
    </div>
  );
}

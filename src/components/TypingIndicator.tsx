export function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-chat-assistant rounded-2xl rounded-bl-md px-5 py-4 shadow-soft">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-dots" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-dots animation-delay-200" />
          <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse-dots animation-delay-400" />
        </div>
      </div>
    </div>
  );
}

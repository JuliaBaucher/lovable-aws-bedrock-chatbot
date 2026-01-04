import { Trash2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TechArchitecture } from "./TechArchitecture";

interface ChatHeaderProps {
  onClearChat: () => void;
  messageCount: number;
}

export function ChatHeader({ onClearChat, messageCount }: ChatHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-4 py-6 shadow-soft">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Julia Baucher
              <span className="ml-2 text-primary">– AI CV Assistant</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Ask me about experience, projects, ML/GenAI, logistics, and product leadership.
            </p>
          </div>
          
          <div className="flex shrink-0 gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="View tech architecture"
                  className="h-9 w-9"
                >
                  <Info className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>System Architecture</DialogTitle>
                </DialogHeader>
                <TechArchitecture />
              </DialogContent>
            </Dialog>
            
            {messageCount > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={onClearChat}
                aria-label="Clear chat history"
                className="h-9 w-9 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

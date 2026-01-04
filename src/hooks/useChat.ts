import { useState, useEffect, useCallback } from "react";
import { Message, MessageRole } from "@/components/ChatMessage";

const API_ENDPOINT = "https://mjnq8gk6vh.execute-api.eu-north-1.amazonaws.com/prod/chat";
const STORAGE_KEY = "julia-cv-chat-history";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function loadMessages(): Message[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
    }
  } catch (e) {
    console.error("Failed to load chat history:", e);
  }
  return [];
}

function saveMessages(messages: Message[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    console.error("Failed to save chat history:", e);
  }
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(() => loadMessages());
  const [isLoading, setIsLoading] = useState(false);

  // Persist messages to localStorage
  useEffect(() => {
    saveMessages(messages);
  }, [messages]);

  const addMessage = useCallback((role: MessageRole, content: string): Message => {
    const message: Message = {
      id: generateId(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
    return message;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    addMessage("user", content);
    setIsLoading(true);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        const errorMessage = data.error || `Request failed with status ${response.status}`;
        addMessage("error", `Sorry, something went wrong: ${errorMessage}`);
      } else if (data.reply) {
        addMessage("assistant", data.reply);
      } else {
        addMessage("error", "Received an empty response from the assistant.");
      }
    } catch (error) {
      console.error("Chat error:", error);
      addMessage(
        "error",
        "Unable to connect to the assistant. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, addMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearChat,
  };
}

"use client";

import { useState } from "react";
import { Send, Calendar } from "lucide-react";
import { useChatStore, sendMockMessage } from "@/stores/chatStore";
import { Transcript } from "@/components/chat/Transcript";
import { PromptChips } from "@/components/chat/PromptChips";
import { BookingDialog } from "@/components/chat/BookingDialog";
import { captureEvent } from "@/utils/posthog";

interface ChatPageClientProps {
  username?: string;
}

export function ChatPageClient(_props: ChatPageClientProps) {
  const [input, setInput] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const { isTyping } = useChatStore();

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;
    setInput("");
    captureEvent("chat_message_sent");
    await sendMockMessage(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] pb-20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div>
          <h1 className="font-semibold">Chat</h1>
          <p className="text-xs text-muted-foreground">Ask anything or book a session</p>
        </div>
        <button
          onClick={() => setBookingOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 glass rounded-xl text-xs font-medium"
        >
          <Calendar size={13} />
          Book
        </button>
      </div>

      {/* Transcript */}
      <Transcript />

      {/* Prompt chips */}
      <PromptChips />

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            disabled={isTyping}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="p-2.5 bg-primary rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Booking dialog */}
      <BookingDialog open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
}

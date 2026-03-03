import { create } from "zustand";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  setTyping: (typing: boolean) => void;
  clearMessages: () => void;
}

const MOCK_RESPONSES = [
  "I'd be happy to help! Could you tell me more about what you're looking for?",
  "That sounds great! I have availability this week. Would you like to book a session?",
  "I specialize in that area. Let me share some relevant work from my portfolio.",
  "Sure! I can walk you through my process. It typically takes 2-3 weeks from kickoff to delivery.",
  "Great question! My rate for this type of project is competitive — let's discuss your budget.",
];

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: "welcome",
      role: "assistant",
      content: "Hey! 👋 I'm here to help. What can I do for you today?",
      timestamp: new Date(),
    },
  ],
  isTyping: false,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          timestamp: new Date(),
        },
      ],
    })),
  setTyping: (typing) => set({ isTyping: typing }),
  clearMessages: () =>
    set({
      messages: [
        {
          id: "welcome",
          role: "assistant",
          content: "Hey! 👋 I'm here to help. What can I do for you today?",
          timestamp: new Date(),
        },
      ],
    }),
}));

export async function sendMockMessage(content: string) {
  const store = useChatStore.getState();
  store.addMessage({ role: "user", content });
  store.setTyping(true);
  await new Promise((r) => setTimeout(r, 1200 + Math.random() * 800));
  store.setTyping(false);
  const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
  store.addMessage({ role: "assistant", content: response });
}

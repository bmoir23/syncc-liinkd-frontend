"use client";

import { motion } from "framer-motion";
import { sendMockMessage } from "@/stores/chatStore";

const PROMPTS = [
  "What services do you offer?",
  "What's your availability?",
  "Can we schedule a call?",
  "Tell me about past projects",
  "What are your rates?",
];

export function PromptChips() {
  return (
    <div className="flex gap-2 px-4 pb-2 overflow-x-auto scrollbar-hide">
      {PROMPTS.map((prompt, i) => (
        <motion.button
          key={prompt}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => sendMockMessage(prompt)}
          className="flex-shrink-0 text-xs px-3 py-1.5 glass rounded-full text-muted-foreground hover:text-foreground transition-colors"
        >
          {prompt}
        </motion.button>
      ))}
    </div>
  );
}

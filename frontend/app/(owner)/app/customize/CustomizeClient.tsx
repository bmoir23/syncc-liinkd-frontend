"use client";

import { motion } from "framer-motion";
import { Palette } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { ACCENT_COLORS } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { toast } from "sonner";

const CARD_OPTIONS = [
  { id: "services", label: "Services", description: "Your service offerings and pricing" },
  { id: "availability", label: "Availability", description: "Weekly availability calendar" },
  { id: "testimonials", label: "Testimonials", description: "Client reviews and ratings" },
  { id: "updates", label: "Updates", description: "Recent news and announcements" },
  { id: "about", label: "About", description: "Your bio and background" },
  { id: "links", label: "Links", description: "Social links and external URLs" },
];

export function CustomizeClient() {
  const { visibleCards, toggleCard, accentColor, setAccentColor, resetCards } = useUiStore();

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="p-6 space-y-6 max-w-3xl"
    >
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold">Customize Profile</h1>
        <p className="text-muted-foreground text-sm mt-1">Control how your public profile looks</p>
      </motion.div>

      {/* Accent Color */}
      <motion.div variants={staggerItem} className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Palette size={18} className="text-primary" />
          <h2 className="font-semibold">Accent Color</h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                setAccentColor(color.value);
                toast.success(`Accent color set to ${color.label}`);
              }}
              className={cn(
                "flex flex-col items-center gap-1.5 group"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full border-2 transition-all",
                  accentColor === color.value
                    ? "border-white scale-110"
                    : "border-transparent group-hover:border-white/50"
                )}
                style={{ background: `hsl(${color.value})` }}
              />
              <span className="text-[10px] text-muted-foreground">{color.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Visible Cards */}
      <motion.div variants={staggerItem} className="glass rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Profile Cards</h2>
          <button
            onClick={() => {
              resetCards();
              toast.success("Cards reset to default");
            }}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Reset to default
          </button>
        </div>
        <div className="space-y-2">
          {CARD_OPTIONS.map((card) => {
            const visible = visibleCards.includes(card.id);
            return (
              <div
                key={card.id}
                className="flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors"
              >
                <div>
                  <p className="text-sm font-medium">{card.label}</p>
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                </div>
                <button
                  onClick={() => {
                    toggleCard(card.id);
                    toast.success(`${card.label} ${visible ? "hidden" : "shown"}`);
                  }}
                  className={cn(
                    "relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
                    visible ? "bg-primary" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform shadow-sm",
                      visible ? "translate-x-5" : "translate-x-0"
                    )}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}

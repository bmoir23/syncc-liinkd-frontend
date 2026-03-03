"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Settings2, X } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { cn } from "@/lib/cn";
import { ACCENT_COLORS } from "@/lib/constants";

const CARD_OPTIONS = [
  { id: "services", label: "Services" },
  { id: "availability", label: "Availability" },
  { id: "testimonials", label: "Testimonials" },
  { id: "updates", label: "Updates" },
  { id: "about", label: "About" },
  { id: "links", label: "Links" },
];

export function CustomizationSheet() {
  const [open, setOpen] = useState(false);
  const { visibleCards, toggleCard, accentColor, setAccentColor } = useUiStore();

  return (
    <>
      {/* Trigger */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
        className="fixed bottom-24 right-4 z-40 p-3 glass rounded-2xl text-muted-foreground hover:text-foreground transition-colors"
      >
        <Settings2 size={18} />
      </motion.button>

      {/* Sheet */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 h-full w-80 glass border-l border-white/10 p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Customize Profile</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Accent Color */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Accent Color</h3>
              <div className="flex gap-2 flex-wrap">
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className={cn(
                      "w-8 h-8 rounded-full border-2 transition-all",
                      accentColor === color.value
                        ? "border-white scale-110"
                        : "border-transparent"
                    )}
                    style={{
                      background: `hsl(${color.value})`,
                    }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Visible Cards */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Visible Cards</h3>
              <div className="space-y-2">
                {CARD_OPTIONS.map((card) => {
                  const visible = visibleCards.includes(card.id);
                  return (
                    <div
                      key={card.id}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{card.label}</span>
                      <button
                        onClick={() => toggleCard(card.id)}
                        className={cn(
                          "relative w-10 h-5 rounded-full transition-colors",
                          visible ? "bg-primary" : "bg-white/10"
                        )}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                            visible ? "translate-x-5" : "translate-x-0"
                          )}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

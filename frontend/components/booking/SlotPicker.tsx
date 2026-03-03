"use client";

import { motion } from "framer-motion";
import { useBookingStore, AVAILABLE_SLOTS } from "@/stores/bookingStore";
import { cn } from "@/lib/cn";

export function SlotPicker() {
  const { selectedSlot, setSelectedSlot, selectedDate } = useBookingStore();

  if (!selectedDate) {
    return (
      <p className="text-sm text-muted-foreground text-center py-8">
        Select a date to see available time slots
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">Available Times</h3>
      <div className="grid grid-cols-2 gap-2">
        {AVAILABLE_SLOTS.map((slot, i) => (
          <motion.button
            key={slot.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            whileHover={slot.available ? { scale: 1.03 } : undefined}
            whileTap={slot.available ? { scale: 0.97 } : undefined}
            disabled={!slot.available}
            onClick={() => slot.available && setSelectedSlot(slot)}
            className={cn(
              "py-2.5 px-3 rounded-xl text-sm transition-colors border",
              slot.available
                ? selectedSlot?.id === slot.id
                  ? "bg-primary border-primary text-primary-foreground font-medium"
                  : "border-white/10 hover:border-primary/50 hover:bg-primary/10"
                : "border-white/5 text-muted-foreground/40 cursor-not-allowed bg-white/[0.02]"
            )}
          >
            {slot.time}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

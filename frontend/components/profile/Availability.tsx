"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const AVAILABILITY: Record<string, { available: boolean; hours?: string }> = {
  Mon: { available: true, hours: "9am–5pm" },
  Tue: { available: true, hours: "9am–5pm" },
  Wed: { available: true, hours: "9am–5pm" },
  Thu: { available: true, hours: "9am–5pm" },
  Fri: { available: true, hours: "9am–3pm" },
  Sat: { available: false },
  Sun: { available: false },
};

export function Availability() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Clock size={14} className="text-muted-foreground" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Availability
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => {
          const info = AVAILABILITY[day];
          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={cn(
                "flex flex-col items-center gap-1 p-2 rounded-xl",
                info.available ? "bg-primary/10 border border-primary/20" : "bg-white/5 border border-white/5"
              )}
            >
              <span className="text-[10px] font-medium text-muted-foreground">{day}</span>
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  info.available ? "bg-emerald-400" : "bg-muted-foreground/30"
                )}
              />
              {info.available && info.hours && (
                <span className="text-[8px] text-center text-muted-foreground leading-tight">
                  {info.hours}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

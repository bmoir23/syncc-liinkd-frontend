"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBookingStore } from "@/stores/bookingStore";
import { cn } from "@/lib/cn";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export function MiniCalendar() {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const { selectedDate, setSelectedDate } = useBookingStore();

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const monthName = new Date(viewYear, viewMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getFullYear() === viewYear
    );
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const isPast = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    return date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  };

  const handleSelect = (day: number) => {
    if (isPast(day)) return;
    setSelectedDate(new Date(viewYear, viewMonth, day));
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="p-1 rounded-lg hover:bg-white/5 transition-colors">
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm font-medium">{monthName}</span>
        <button onClick={nextMonth} className="p-1 rounded-lg hover:bg-white/5 transition-colors">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1">
        {DAYS_OF_WEEK.map((day) => (
          <div key={day} className="text-center text-[10px] text-muted-foreground font-medium py-1">
            {day}
          </div>
        ))}
        {/* Empty cells */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const selected = isSelected(day);
          const todayDay = isToday(day);
          return (
            <motion.button
              key={day}
              whileHover={past ? undefined : { scale: 1.1 }}
              whileTap={past ? undefined : { scale: 0.95 }}
              onClick={() => handleSelect(day)}
              disabled={past}
              className={cn(
                "aspect-square w-full text-xs rounded-lg transition-colors flex items-center justify-center",
                past && "text-muted-foreground/40 cursor-not-allowed",
                !past && !selected && "hover:bg-white/10",
                selected && "bg-primary text-primary-foreground font-medium",
                todayDay && !selected && "text-primary font-medium ring-1 ring-primary/50"
              )}
            >
              {day}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

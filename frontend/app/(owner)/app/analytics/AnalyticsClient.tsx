"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const WEEKLY_DATA = [
  { day: "Mon", views: 320, chats: 18, bookings: 5 },
  { day: "Tue", views: 280, chats: 12, bookings: 3 },
  { day: "Wed", views: 450, chats: 28, bookings: 8 },
  { day: "Thu", views: 390, chats: 22, bookings: 6 },
  { day: "Fri", views: 520, chats: 35, bookings: 10 },
  { day: "Sat", views: 210, chats: 8, bookings: 2 },
  { day: "Sun", views: 180, chats: 6, bookings: 1 },
];

const MAX_VIEWS = Math.max(...WEEKLY_DATA.map((d) => d.views));

export function AnalyticsClient() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="p-6 space-y-6 max-w-5xl"
    >
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Track your profile performance</p>
      </motion.div>

      {/* Bar chart */}
      <motion.div variants={staggerItem} className="glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          <h2 className="font-semibold">Weekly Profile Views</h2>
        </div>
        <div className="flex items-end gap-2 h-40">
          {WEEKLY_DATA.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.views / MAX_VIEWS) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="w-full bg-primary/60 rounded-t-lg min-h-[4px]"
              />
              <span className="text-[10px] text-muted-foreground">{d.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Summary table */}
      <motion.div variants={staggerItem} className="glass rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h2 className="font-semibold">Daily Breakdown</h2>
        </div>
        <div className="divide-y divide-white/5">
          <div className="grid grid-cols-4 px-4 py-2 text-xs text-muted-foreground font-medium">
            <span>Day</span>
            <span className="text-right">Views</span>
            <span className="text-right">Chats</span>
            <span className="text-right">Bookings</span>
          </div>
          {WEEKLY_DATA.map((d) => (
            <div key={d.day} className="grid grid-cols-4 px-4 py-3 text-sm">
              <span>{d.day}</span>
              <span className="text-right">{d.views}</span>
              <span className="text-right">{d.chats}</span>
              <span className="text-right">{d.bookings}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Trend */}
      <motion.div variants={staggerItem} className="flex items-center gap-3 p-4 glass rounded-2xl">
        <TrendingUp size={20} className="text-emerald-400" />
        <div>
          <p className="font-medium text-sm">Strong week performance</p>
          <p className="text-xs text-muted-foreground">Your profile views are up 12% vs last week</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

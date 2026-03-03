"use client";

import { motion } from "framer-motion";
import { Users, Eye, Calendar, MessageCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import Link from "next/link";

const STATS = [
  { label: "Profile Views", value: "2,847", icon: Eye, change: "+12%", color: "text-violet-400", bg: "bg-violet-400/10" },
  { label: "Chat Sessions", value: "143", icon: MessageCircle, change: "+8%", color: "text-cyan-400", bg: "bg-cyan-400/10" },
  { label: "Bookings", value: "38", icon: Calendar, change: "+24%", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  { label: "Unique Visitors", value: "1,204", icon: Users, change: "+5%", color: "text-amber-400", bg: "bg-amber-400/10" },
];

const RECENT_BOOKINGS = [
  { name: "Sarah Kim", time: "Today 2:00 PM", status: "confirmed" },
  { name: "Marcus Liu", time: "Tomorrow 10:00 AM", status: "confirmed" },
  { name: "Priya Mehta", time: "Thu 3:30 PM", status: "pending" },
];

export function DashboardClient() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="p-6 space-y-6 max-w-5xl"
    >
      {/* Header */}
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} variants={staggerItem} className="glass rounded-2xl p-4 space-y-3">
              <div className={`w-9 h-9 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <Icon size={18} className={stat.color} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
              <div className="flex items-center gap-1 text-xs text-emerald-400">
                <TrendingUp size={12} />
                {stat.change} this week
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={staggerItem} className="glass rounded-2xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Upcoming Bookings</h2>
            <Link href="/app/analytics" className="text-xs text-primary flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {RECENT_BOOKINGS.map((booking) => (
              <div key={booking.name} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center text-xs font-medium text-primary">
                  {booking.name[0]}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{booking.name}</p>
                  <p className="text-xs text-muted-foreground">{booking.time}</p>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    booking.status === "confirmed"
                      ? "bg-emerald-400/20 text-emerald-400"
                      : "bg-amber-400/20 text-amber-400"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div variants={staggerItem} className="glass rounded-2xl p-4 space-y-4">
          <h2 className="font-semibold">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "View your public profile", href: "/u/demo", icon: Eye },
              { label: "Customize profile", href: "/app/customize", icon: Users },
              { label: "Manage integrations", href: "/app/integrations", icon: Calendar },
            ].map((action) => {
              const Icon = action.icon;
              return (
                <Link key={action.label} href={action.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <Icon size={16} className="text-muted-foreground" />
                    <span className="text-sm">{action.label}</span>
                    <ArrowUpRight size={14} className="text-muted-foreground ml-auto" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

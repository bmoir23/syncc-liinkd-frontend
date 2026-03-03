"use client";

import { motion } from "framer-motion";
import { MessageCircle, Calendar, Plug, BarChart3, Palette, Zap } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "AI Chat",
    description: "Let visitors ask questions and book sessions through an intelligent AI assistant.",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    icon: Calendar,
    title: "Smart Booking",
    description: "Beautiful calendar with real-time availability, slots, and confirmation flow.",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    icon: Plug,
    title: "n8n Workflows",
    description: "Connect any n8n webhook to trigger automation and surface results in your profile.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
  {
    icon: BarChart3,
    title: "Analytics",
    description: "Track profile views, chat sessions, bookings, and conversion rates.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Palette,
    title: "Bento Customization",
    description: "Toggle cards, change accent colors, and make your profile uniquely yours.",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built with Next.js 15 App Router and optimized for Core Web Vitals.",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
];

export function FeatureGrid() {
  return (
    <section className="py-24 px-6">
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto"
      >
        <motion.div variants={staggerItem} className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Everything you need
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A complete platform for professionals to showcase their work,
            connect with clients, and automate their workflow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 space-y-3"
              >
                <div className={`w-10 h-10 rounded-xl ${feature.bg} flex items-center justify-center`}>
                  <Icon size={20} className={feature.color} />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

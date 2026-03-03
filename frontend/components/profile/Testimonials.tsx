"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const TESTIMONIALS = [
  {
    id: "1",
    name: "Sarah K.",
    role: "CEO, TechStart",
    text: "Alex delivered exactly what we envisioned. The attention to detail is unmatched.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
  },
  {
    id: "2",
    name: "Marcus L.",
    role: "Product Manager",
    text: "Fast turnaround, clean code, and excellent communication throughout.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
  },
  {
    id: "3",
    name: "Priya M.",
    role: "Founder, DesignCo",
    text: "Working with Alex transformed our product. Highly recommend for any serious project.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
  },
];

export function Testimonials() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
        Testimonials
      </h2>
      <div className="space-y-2">
        {TESTIMONIALS.map((t) => (
          <motion.div
            key={t.id}
            variants={staggerItem}
            className="p-3 glass rounded-2xl space-y-2"
          >
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.avatar}
                alt={t.name}
                className="w-8 h-8 rounded-full bg-muted"
              />
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
              <div className="ml-auto flex">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

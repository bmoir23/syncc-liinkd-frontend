"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="text-center max-w-4xl mx-auto px-6"
      >
        {/* Badge */}
        <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full text-sm text-muted-foreground mb-8">
          <Zap size={14} className="text-primary" />
          <span>AI-powered professional profiles</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={staggerItem}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
        >
          Your professional
          <br />
          <span className="text-gradient">link-in-bio</span>, elevated
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={staggerItem}
          className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          One beautiful page for your work, bookings, and AI-powered conversations.
          Connect your workflows and let your profile work for you.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={staggerItem} className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/u/demo">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 bg-primary rounded-2xl font-semibold text-sm hover:bg-primary/90 transition-colors glow"
            >
              View Demo Profile
              <ArrowRight size={16} />
            </motion.button>
          </Link>
          <Link href="/app/dashboard">
            <motion.button
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-3.5 glass rounded-2xl font-semibold text-sm"
            >
              Open Dashboard
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

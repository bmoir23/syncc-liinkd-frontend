"use client";

import { motion } from "framer-motion";
import { MapPin, Link2, Verified } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const MOCK_PROFILE = {
  name: "Alex Chen",
  username: "alexchen",
  title: "Full-Stack Developer & Designer",
  location: "San Francisco, CA",
  website: "alexchen.dev",
  bio: "Building beautiful products at the intersection of design and engineering. Available for consulting and collaboration.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexchen",
  verified: true,
  stats: [
    { label: "Projects", value: "48+" },
    { label: "Clients", value: "120+" },
    { label: "Years", value: "8" },
  ],
};

export function ProfileHeader() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="flex flex-col items-center text-center space-y-4 pt-8 pb-4"
    >
      {/* Avatar */}
      <motion.div variants={staggerItem} className="relative">
        <div className="w-24 h-24 rounded-2xl overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={MOCK_PROFILE.avatar}
            alt={MOCK_PROFILE.name}
            className="w-full h-full object-cover bg-muted"
          />
        </div>
        {MOCK_PROFILE.verified && (
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Verified size={12} className="text-white" />
          </div>
        )}
      </motion.div>

      {/* Name & Title */}
      <motion.div variants={staggerItem} className="space-y-1">
        <h1 className="text-2xl font-bold">{MOCK_PROFILE.name}</h1>
        <p className="text-muted-foreground">{MOCK_PROFILE.title}</p>
      </motion.div>

      {/* Bio */}
      <motion.p variants={staggerItem} className="text-sm text-muted-foreground max-w-sm">
        {MOCK_PROFILE.bio}
      </motion.p>

      {/* Meta */}
      <motion.div variants={staggerItem} className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin size={12} />
          {MOCK_PROFILE.location}
        </span>
        <span className="flex items-center gap-1">
          <Link2 size={12} />
          {MOCK_PROFILE.website}
        </span>
      </motion.div>

      {/* Stats */}
      <motion.div variants={staggerItem} className="flex items-center gap-6">
        {MOCK_PROFILE.stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

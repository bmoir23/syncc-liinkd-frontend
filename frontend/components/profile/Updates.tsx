"use client";

import { motion } from "framer-motion";
import { Newspaper, ExternalLink } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const UPDATES = [
  {
    id: "1",
    title: "Launched new portfolio site",
    description: "Rebuilt my site with Next.js 15 and added new case studies.",
    date: "2 days ago",
    tag: "Launch",
    tagColor: "bg-violet-400/20 text-violet-400",
  },
  {
    id: "2",
    title: "Available for new projects",
    description: "Taking on 2 new consulting clients for Q1 2025.",
    date: "1 week ago",
    tag: "Availability",
    tagColor: "bg-emerald-400/20 text-emerald-400",
  },
  {
    id: "3",
    title: "Case study: Fintech Dashboard",
    description: "Published an in-depth breakdown of a recent fintech project.",
    date: "2 weeks ago",
    tag: "Case Study",
    tagColor: "bg-cyan-400/20 text-cyan-400",
  },
];

export function Updates() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      <div className="flex items-center gap-2 px-1">
        <Newspaper size={14} className="text-muted-foreground" />
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Updates
        </h2>
      </div>
      <div className="space-y-2">
        {UPDATES.map((update) => (
          <motion.div
            key={update.id}
            variants={staggerItem}
            whileHover={{ x: 2 }}
            className="flex gap-3 p-3 glass rounded-2xl cursor-pointer group"
          >
            <div className="flex-1 space-y-1">
              <div className="flex items-start gap-2">
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${update.tagColor}`}
                >
                  {update.tag}
                </span>
                <span className="text-xs text-muted-foreground ml-auto flex-shrink-0">
                  {update.date}
                </span>
              </div>
              <p className="text-sm font-medium">{update.title}</p>
              <p className="text-xs text-muted-foreground">{update.description}</p>
            </div>
            <ExternalLink
              size={14}
              className="text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0 mt-1"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

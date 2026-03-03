"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { User, Briefcase, MessageCircle, Calendar } from "lucide-react";
import { cn } from "@/lib/cn";

const DOCK_ITEMS = [
  { label: "Profile", icon: User, segment: "" },
  { label: "Work", icon: Briefcase, segment: "work" },
  { label: "Chat", icon: MessageCircle, segment: "chat" },
  { label: "Book", icon: Calendar, segment: "book" },
];

interface DockProps {
  username: string;
}

export function Dock({ username }: DockProps) {
  const pathname = usePathname();

  const getHref = (segment: string) =>
    segment ? `/u/${username}/${segment}` : `/u/${username}`;

  const isActive = (segment: string) => {
    const href = getHref(segment);
    return pathname === href;
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex items-center gap-1 px-3 py-3 glass rounded-2xl glow"
      >
        {DOCK_ITEMS.map((item) => {
          const active = isActive(item.segment);
          const Icon = item.icon;
          return (
            <Link key={item.segment} href={getHref(item.segment)}>
              <motion.div
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors",
                  active
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon size={20} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="dock-indicator"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BarChart3, Palette, Bot, Plug, Settings, ChevronLeft, Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useUiStore } from "@/stores/uiStore";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
  { label: "Customize", href: "/app/customize", icon: Palette },
  { label: "Agent", href: "/app/agent", icon: Bot },
  { label: "Integrations", href: "/app/integrations", icon: Plug },
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUiStore();

  return (
    <motion.aside
      animate={{ width: sidebarOpen ? 240 : 64 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="relative flex flex-col h-screen glass border-r border-white/10 flex-shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
          <Zap size={16} className="text-primary" />
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="font-semibold text-sm whitespace-nowrap overflow-hidden"
            >
              Syncc Liinkd
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 2 }}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors",
                  active
                    ? "bg-primary/20 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                )}
              >
                <Icon size={18} className="flex-shrink-0" />
                <AnimatePresence>
                  {sidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Collapse button */}
      <div className="p-2 border-t border-white/10">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center justify-center p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
        >
          <motion.div animate={{ rotate: sidebarOpen ? 0 : 180 }} transition={{ duration: 0.2 }}>
            <ChevronLeft size={16} />
          </motion.div>
        </button>
      </div>
    </motion.aside>
  );
}

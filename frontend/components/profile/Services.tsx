"use client";

import { motion } from "framer-motion";
import { Code, Figma, Smartphone, Globe, ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const SERVICES = [
  {
    id: "web",
    icon: Globe,
    title: "Web Development",
    description: "Full-stack web apps with modern frameworks",
    price: "From $3,000",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile Apps",
    description: "iOS & Android with React Native",
    price: "From $5,000",
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
  },
  {
    id: "design",
    icon: Figma,
    title: "UI/UX Design",
    description: "Beautiful, user-centered interfaces",
    price: "From $1,500",
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
  {
    id: "consulting",
    icon: Code,
    title: "Technical Consulting",
    description: "Architecture reviews and code audits",
    price: "From $200/hr",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

export function Services() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-3"
    >
      <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
        Services
      </h2>
      <div className="space-y-2">
        {SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              variants={staggerItem}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 p-3 glass rounded-2xl cursor-pointer group"
            >
              <div className={`w-9 h-9 rounded-xl ${service.bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={service.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{service.title}</span>
                </div>
                <p className="text-xs text-muted-foreground">{service.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs font-medium text-primary">{service.price}</div>
                <ArrowRight
                  size={12}
                  className="text-muted-foreground group-hover:text-foreground transition-colors ml-auto mt-0.5"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

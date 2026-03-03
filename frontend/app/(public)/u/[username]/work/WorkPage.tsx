"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const PROJECTS = [
  {
    id: "1",
    title: "Fintech Dashboard",
    category: "Web App",
    description: "Real-time trading dashboard with advanced charting and portfolio tracking.",
    tags: ["Next.js", "TypeScript", "D3.js"],
    image: "https://picsum.photos/seed/fintech/400/220",
    color: "from-violet-500/20 to-cyan-500/20",
  },
  {
    id: "2",
    title: "E-commerce Mobile App",
    category: "Mobile",
    description: "Cross-platform shopping app with AR product preview and seamless checkout.",
    tags: ["React Native", "Expo", "Stripe"],
    image: "https://picsum.photos/seed/ecommerce/400/220",
    color: "from-pink-500/20 to-orange-500/20",
  },
  {
    id: "3",
    title: "SaaS Analytics Platform",
    category: "Web App",
    description: "Multi-tenant analytics platform with custom dashboards and data visualization.",
    tags: ["React", "Node.js", "PostgreSQL"],
    image: "https://picsum.photos/seed/analytics/400/220",
    color: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: "4",
    title: "Design System",
    category: "Design",
    description: "Comprehensive component library with 200+ components and full documentation.",
    tags: ["Figma", "Storybook", "React"],
    image: "https://picsum.photos/seed/design/400/220",
    color: "from-amber-500/20 to-rose-500/20",
  },
];

interface WorkPageProps {
  username?: string;
}

export function WorkPage(_props: WorkPageProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="py-8 space-y-6 pb-28"
    >
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold mb-1">Work</h1>
        <p className="text-muted-foreground text-sm">Selected projects and case studies</p>
      </motion.div>

      <div className="space-y-4">
        {PROJECTS.map((project) => (
          <motion.div
            key={project.id}
            variants={staggerItem}
            whileHover={{ y: -2 }}
            className="glass rounded-2xl overflow-hidden group cursor-pointer"
          >
            <div
              className={`h-40 bg-gradient-to-br ${project.color} relative overflow-hidden`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-30"
              />
              <div className="absolute inset-0 flex items-end p-4">
                <span className="text-xs px-2 py-1 glass rounded-full">{project.category}</span>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{project.title}</h3>
                <div className="flex gap-1.5">
                  <button className="p-1.5 glass rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <Github size={14} />
                  </button>
                  <button className="p-1.5 glass rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
              <div className="flex gap-1.5 flex-wrap">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 glass rounded-full text-muted-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

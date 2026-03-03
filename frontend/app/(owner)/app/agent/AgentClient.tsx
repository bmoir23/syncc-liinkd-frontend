"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { N8nConnector, WorkflowRunHistory } from "@/components/integrations/N8nConnector";
import { WorkflowVisualizer } from "@/components/integrations/WorkflowVisualizer";

export function AgentClient() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="p-6 space-y-6 max-w-4xl"
    >
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-2 mb-1">
          <Bot size={22} className="text-primary" />
          <h1 className="text-2xl font-bold">Agent</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Trigger n8n workflows and view automation results
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Connector */}
        <motion.div variants={staggerItem} className="glass rounded-2xl p-5">
          <N8nConnector />
        </motion.div>

        {/* Visualizer */}
        <motion.div variants={staggerItem} className="glass rounded-2xl p-5">
          <WorkflowVisualizer />
        </motion.div>
      </div>

      {/* Run history */}
      <motion.div variants={staggerItem} className="glass rounded-2xl p-5">
        <WorkflowRunHistory />
      </motion.div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Plug, Workflow, Zap, CheckCircle } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { N8nConnector, WorkflowRunHistory } from "@/components/integrations/N8nConnector";
import { WorkflowVisualizer } from "@/components/integrations/WorkflowVisualizer";

const INTEGRATIONS = [
  { id: "n8n", name: "n8n", description: "Workflow automation", icon: Workflow, connected: true },
  { id: "posthog", name: "PostHog", description: "Product analytics", icon: Zap, connected: true },
  { id: "auth0", name: "Auth0", description: "Authentication", icon: CheckCircle, connected: false },
];

export function IntegrationsClient() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="p-6 space-y-6 max-w-4xl"
    >
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-2 mb-1">
          <Plug size={22} className="text-primary" />
          <h1 className="text-2xl font-bold">Integrations</h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Connect your tools and automate your workflow
        </p>
      </motion.div>

      {/* Integration status */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {INTEGRATIONS.map((integration) => {
          const Icon = integration.icon;
          return (
            <motion.div key={integration.id} variants={staggerItem} className="glass rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon size={18} className="text-primary" />
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full ${
                    integration.connected
                      ? "bg-emerald-400/20 text-emerald-400"
                      : "bg-white/10 text-muted-foreground"
                  }`}
                >
                  {integration.connected ? "Connected" : "Not connected"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{integration.name}</p>
                <p className="text-xs text-muted-foreground">{integration.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* n8n connector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div variants={staggerItem} className="glass rounded-2xl p-5">
          <N8nConnector />
        </motion.div>
        <motion.div variants={staggerItem} className="glass rounded-2xl p-5">
          <WorkflowVisualizer />
        </motion.div>
      </div>

      <motion.div variants={staggerItem} className="glass rounded-2xl p-5">
        <WorkflowRunHistory />
      </motion.div>
    </motion.div>
  );
}

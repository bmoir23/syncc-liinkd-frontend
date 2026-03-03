"use client";

import { motion } from "framer-motion";
import { useIntegrationsStore } from "@/stores/integrationsStore";

const MOCK_NODES = [
  { id: "trigger", label: "Webhook Trigger", type: "trigger" },
  { id: "process", label: "Process Data", type: "action" },
  { id: "branch", label: "IF Condition", type: "condition" },
  { id: "response", label: "Send Response", type: "action" },
];

const NODE_COLORS: Record<string, string> = {
  trigger: "bg-violet-400/20 border border-violet-400/30 text-violet-400",
  action: "bg-cyan-400/20 border border-cyan-400/30 text-cyan-400",
  condition: "bg-amber-400/20 border border-amber-400/30 text-amber-400",
};

function getDataString(data: unknown): string {
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

export function WorkflowVisualizer() {
  const { isRunning, runs } = useIntegrationsStore();
  const lastRun = runs[0];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Workflow Graph</h3>
        {isRunning && (
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            Running
          </span>
        )}
        {!isRunning && lastRun != null && (
          <span className={`text-xs ${lastRun.result.success ? "text-emerald-400" : "text-destructive"}`}>
            Last: {lastRun.result.success ? "Success" : "Failed"}
          </span>
        )}
      </div>

      {/* Mock visual graph */}
      <div className="flex items-center gap-1.5 py-3 overflow-x-auto scrollbar-hide">
        {MOCK_NODES.map((node, i) => (
          <div key={node.id} className="flex items-center gap-1.5 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`px-2 py-1.5 rounded-lg text-[10px] font-medium whitespace-nowrap ${NODE_COLORS[node.type] ?? ""}`}
            >
              {node.label}
            </motion.div>
            {i < MOCK_NODES.length - 1 && (
              <div className="w-4 h-px bg-white/20 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Last result */}
      {lastRun?.result.data != null && (
        <div className="p-3 bg-black/20 rounded-xl">
          <p className="text-[10px] text-muted-foreground mb-1">Last Response</p>
          <pre className="text-[10px] text-foreground overflow-x-auto scrollbar-hide">
            {getDataString(lastRun.result.data)}
          </pre>
        </div>
      )}
    </div>
  );
}

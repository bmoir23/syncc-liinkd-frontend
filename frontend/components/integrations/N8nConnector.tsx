"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plug, Play, X, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useIntegrationsStore } from "@/stores/integrationsStore";
import { triggerN8nWebhook, validateWebhookUrl } from "@/utils/n8n";
import { captureEvent } from "@/utils/posthog";

export function N8nConnector() {
  const { webhookUrl, setWebhookUrl, addRun, setRunning, isRunning } = useIntegrationsStore();
  const [inputUrl, setInputUrl] = useState(webhookUrl);
  const [urlError, setUrlError] = useState("");

  const handleSave = () => {
    if (!validateWebhookUrl(inputUrl)) {
      setUrlError("Please enter a valid URL (http:// or https://)");
      return;
    }
    setUrlError("");
    setWebhookUrl(inputUrl);
    toast.success("Webhook URL saved");
  };

  const handleTrigger = async () => {
    const url = webhookUrl || inputUrl;
    if (!validateWebhookUrl(url)) {
      setUrlError("Please enter and save a valid webhook URL first");
      return;
    }
    setUrlError("");
    setRunning(true);
    captureEvent("n8n_webhook_triggered", { url });

    const result = await triggerN8nWebhook(url, {
      event: "manual_trigger",
      data: { source: "syncc_agent", timestamp: new Date().toISOString() },
    });

    addRun({
      webhookUrl: url,
      triggeredAt: new Date().toISOString(),
      result,
      label: "Manual Trigger",
    });
    setRunning(false);

    if (result.success) {
      toast.success(`Workflow triggered successfully (${result.duration}ms)`);
    } else {
      toast.error(`Workflow failed: ${result.error}`);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Plug size={18} className="text-primary" />
        <h3 className="font-semibold">n8n Webhook Connector</h3>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Webhook URL</label>
        <div className="flex gap-2">
          <input
            type="url"
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              setUrlError("");
            }}
            placeholder="https://your-n8n-instance.com/webhook/..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-sm transition-colors"
          >
            Save
          </button>
        </div>
        {urlError && (
          <div className="flex items-center gap-1.5 text-xs text-destructive">
            <AlertCircle size={12} />
            {urlError}
          </div>
        )}
      </div>

      <motion.button
        whileHover={!isRunning ? { scale: 1.02 } : undefined}
        whileTap={!isRunning ? { scale: 0.98 } : undefined}
        onClick={handleTrigger}
        disabled={isRunning}
        className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-xl text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRunning ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            />
            Running...
          </>
        ) : (
          <>
            <Play size={14} />
            Trigger Workflow
          </>
        )}
      </motion.button>
    </div>
  );
}

export function WorkflowRunHistory() {
  const { runs, clearRuns } = useIntegrationsStore();

  if (runs.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        No runs yet. Trigger a workflow to see results here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Runs</h3>
        <button
          onClick={clearRuns}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={12} />
          Clear
        </button>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto scrollbar-hide">
        {runs.map((run) => (
          <div key={run.id} className="flex items-start gap-3 p-3 glass rounded-xl">
            {run.result.success ? (
              <CheckCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={14} className="text-destructive flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">{run.label || "Webhook Run"}</span>
                <span className="text-[10px] text-muted-foreground ml-auto">
                  {run.result.duration}ms
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{run.webhookUrl}</p>
              <p className="text-[10px] text-muted-foreground">
                {new Date(run.triggeredAt).toLocaleString()}
              </p>
              {run.result.error && (
                <p className="text-[10px] text-destructive">{run.result.error}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

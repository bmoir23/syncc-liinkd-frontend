import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { N8nWebhookResult } from "@/utils/n8n";

export interface WorkflowRun {
  id: string;
  webhookUrl: string;
  triggeredAt: string;
  result: N8nWebhookResult;
  label?: string;
}

interface IntegrationsState {
  webhookUrl: string;
  runs: WorkflowRun[];
  isRunning: boolean;
  setWebhookUrl: (url: string) => void;
  addRun: (run: Omit<WorkflowRun, "id">) => void;
  setRunning: (running: boolean) => void;
  clearRuns: () => void;
}

export const useIntegrationsStore = create<IntegrationsState>()(
  persist(
    (set) => ({
      webhookUrl: "",
      runs: [],
      isRunning: false,
      setWebhookUrl: (url) => set({ webhookUrl: url }),
      addRun: (run) =>
        set((state) => ({
          runs: [
            {
              ...run,
              id: `run-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            },
            ...state.runs.slice(0, 49),
          ],
        })),
      setRunning: (running) => set({ isRunning: running }),
      clearRuns: () => set({ runs: [] }),
    }),
    {
      name: "syncc-integrations-store",
    }
  )
);

import type { Metadata } from "next";
import { AgentClient } from "./AgentClient";

export const metadata: Metadata = { title: "Agent" };

export default function AgentPage() {
  return <AgentClient />;
}

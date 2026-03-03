import type { Metadata } from "next";
import { IntegrationsClient } from "./IntegrationsClient";

export const metadata: Metadata = { title: "Integrations" };

export default function IntegrationsPage() {
  return <IntegrationsClient />;
}

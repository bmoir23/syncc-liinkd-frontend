import type { Metadata } from "next";
import { CustomizeClient } from "./CustomizeClient";

export const metadata: Metadata = { title: "Customize" };

export default function CustomizePage() {
  return <CustomizeClient />;
}

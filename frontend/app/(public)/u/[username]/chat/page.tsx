import type { Metadata } from "next";
import { ChatPageClient } from "./ChatPageClient";

interface ChatProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ChatProps): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username} · Chat` };
}

export default async function Page({ params }: ChatProps) {
  const { username } = await params;
  return <ChatPageClient username={username} />;
}

import type { Metadata } from "next";
import { WorkPage } from "./WorkPage";

interface WorkProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: WorkProps): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username} · Work` };
}

export default async function Page({ params }: WorkProps) {
  const { username } = await params;
  return <WorkPage username={username} />;
}

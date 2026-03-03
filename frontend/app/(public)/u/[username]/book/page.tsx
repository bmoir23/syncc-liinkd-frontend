import type { Metadata } from "next";
import { BookPageClient } from "./BookPageClient";

interface BookProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: BookProps): Promise<Metadata> {
  const { username } = await params;
  return { title: `@${username} · Book` };
}

export default async function Page({ params }: BookProps) {
  const { username } = await params;
  return <BookPageClient username={username} />;
}

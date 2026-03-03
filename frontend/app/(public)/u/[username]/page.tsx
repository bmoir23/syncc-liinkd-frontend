import type { Metadata } from "next";
import { BentoGrid } from "@/components/profile/BentoGrid";

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username}`,
    description: `View ${username}'s professional profile on Syncc Liinkd`,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  await params; // ensure params are resolved
  return <BentoGrid />;
}

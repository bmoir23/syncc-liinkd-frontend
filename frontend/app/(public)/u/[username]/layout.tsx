import { Dock } from "@/components/layout/Dock";
import { CustomizationSheet } from "@/components/profile/CustomizationSheet";

interface PublicProfileLayoutProps {
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}

export default async function PublicProfileLayout({ children, params }: PublicProfileLayoutProps) {
  const { username } = await params;

  return (
    <div className="min-h-screen relative">
      {/* Ambient background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-900/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <main className="max-w-lg mx-auto px-4">{children}</main>

      {/* Navigation dock */}
      <Dock username={username} />

      {/* Customization */}
      <CustomizationSheet />
    </div>
  );
}

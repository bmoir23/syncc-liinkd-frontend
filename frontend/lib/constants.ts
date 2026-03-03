export const APP_NAME = "Syncc Liinkd";
export const APP_DESCRIPTION = "Your professional link-in-bio and AI-powered booking platform";

export const NAV_ITEMS = [
  { label: "Profile", href: "/u/[username]", icon: "User" },
  { label: "Work", href: "/u/[username]/work", icon: "Briefcase" },
  { label: "Chat", href: "/u/[username]/chat", icon: "MessageCircle" },
  { label: "Book", href: "/u/[username]/book", icon: "Calendar" },
] as const;

export const OWNER_NAV_ITEMS = [
  { label: "Dashboard", href: "/app/dashboard", icon: "LayoutDashboard" },
  { label: "Analytics", href: "/app/analytics", icon: "BarChart3" },
  { label: "Customize", href: "/app/customize", icon: "Palette" },
  { label: "Agent", href: "/app/agent", icon: "Bot" },
  { label: "Integrations", href: "/app/integrations", icon: "Plug" },
  { label: "Settings", href: "/app/settings", icon: "Settings" },
] as const;

export const ACCENT_COLORS = [
  { label: "Violet", value: "263.4 70% 50.4%" },
  { label: "Cyan", value: "189 94% 43%" },
  { label: "Rose", value: "346 77% 49%" },
  { label: "Amber", value: "38 92% 50%" },
  { label: "Emerald", value: "160 84% 39%" },
] as const;

export const MOCK_USERNAME = "demo";

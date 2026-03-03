"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Settings, LogIn, LogOut, User } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { getMockAuthState, mockLogin, mockLogout, initMockAuth } from "@/utils/auth0";
import { captureEvent } from "@/utils/posthog";
import { toast } from "sonner";

export function SettingsClient() {
  const [authState, setAuthState] = useState(() => getMockAuthState());

  useEffect(() => {
    initMockAuth();
    setAuthState(getMockAuthState());
  }, []);

  const handleLogin = () => {
    const user = mockLogin();
    setAuthState(getMockAuthState());
    captureEvent("user_logged_in", { userId: user.id });
    toast.success(`Logged in as ${user.name}`);
  };

  const handleLogout = () => {
    mockLogout();
    setAuthState(getMockAuthState());
    captureEvent("user_logged_out");
    toast.success("Logged out");
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="p-6 space-y-6 max-w-2xl"
    >
      <motion.div variants={staggerItem}>
        <div className="flex items-center gap-2 mb-1">
          <Settings size={22} className="text-primary" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        <p className="text-muted-foreground text-sm">Manage your account and preferences</p>
      </motion.div>

      {/* Auth */}
      <motion.div variants={staggerItem} className="glass rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold">Authentication (Mock)</h2>
        <p className="text-xs text-muted-foreground">
          This is a client-side mock of Auth0 integration. Real Auth0 requires
          NEXT_PUBLIC_AUTH0_DOMAIN and NEXT_PUBLIC_AUTH0_CLIENT_ID.
        </p>

        {authState.isAuthenticated && authState.user ? (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">{authState.user.name}</p>
                <p className="text-xs text-muted-foreground">{authState.user.email}</p>
              </div>
              <span className="ml-auto text-[10px] px-2 py-0.5 bg-emerald-400/20 text-emerald-400 rounded-full">
                Active
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut size={15} />
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogin}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-xl text-sm font-medium"
          >
            <LogIn size={15} />
            Sign In (Mock Auth0)
          </button>
        )}
      </motion.div>

      {/* PostHog */}
      <motion.div variants={staggerItem} className="glass rounded-2xl p-5 space-y-3">
        <h2 className="font-semibold">Analytics (PostHog)</h2>
        <p className="text-xs text-muted-foreground">
          PostHog is initialized client-side via NEXT_PUBLIC_POSTHOG_KEY.
          In development, event capture is disabled.
        </p>
        <button
          onClick={() => {
            captureEvent("test_event", { source: "settings" });
            toast.success("Test event captured (check PostHog dashboard)");
          }}
          className="px-4 py-2 glass rounded-xl text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Fire Test Event
        </button>
      </motion.div>
    </motion.div>
  );
}

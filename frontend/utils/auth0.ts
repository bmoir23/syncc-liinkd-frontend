"use client";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  picture: string;
}

const MOCK_USER: MockUser = {
  id: "auth0|mock-user-123",
  name: "Demo User",
  email: "demo@synccliinkd.com",
  picture: "https://api.dicebear.com/7.x/avataaars/svg?seed=demo",
};

let mockAuthState = {
  isAuthenticated: false,
  user: null as MockUser | null,
  isLoading: false,
};

export function getMockAuthState() {
  return { ...mockAuthState };
}

export function mockLogin() {
  mockAuthState = {
    isAuthenticated: true,
    user: MOCK_USER,
    isLoading: false,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("syncc_mock_auth", JSON.stringify(mockAuthState));
  }
  return MOCK_USER;
}

export function mockLogout() {
  mockAuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
  };
  if (typeof window !== "undefined") {
    localStorage.removeItem("syncc_mock_auth");
  }
}

export function initMockAuth() {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem("syncc_mock_auth");
  if (stored) {
    try {
      mockAuthState = JSON.parse(stored);
    } catch {
      // ignore parse errors
    }
  }
}

export const auth0Config = {
  domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN || "",
  clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || "",
  redirectUri: typeof window !== "undefined" ? window.location.origin : "",
};

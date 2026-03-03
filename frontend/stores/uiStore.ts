import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
  sidebarOpen: boolean;
  accentColor: string;
  visibleCards: string[];
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setAccentColor: (color: string) => void;
  toggleCard: (cardId: string) => void;
  resetCards: () => void;
}

const DEFAULT_CARDS = [
  "services",
  "availability",
  "testimonials",
  "updates",
  "about",
  "links",
];

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      accentColor: "263.4 70% 50.4%",
      visibleCards: DEFAULT_CARDS,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      setAccentColor: (color) => set({ accentColor: color }),
      toggleCard: (cardId) =>
        set((state) => ({
          visibleCards: state.visibleCards.includes(cardId)
            ? state.visibleCards.filter((id) => id !== cardId)
            : [...state.visibleCards, cardId],
        })),
      resetCards: () => set({ visibleCards: DEFAULT_CARDS }),
    }),
    {
      name: "syncc-ui-store",
    }
  )
);

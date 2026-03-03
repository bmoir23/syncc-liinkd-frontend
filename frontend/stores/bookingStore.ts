import { create } from "zustand";

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export interface BookingDetails {
  date: Date | null;
  slot: TimeSlot | null;
  name: string;
  email: string;
  notes: string;
}

interface BookingState {
  selectedDate: Date | null;
  selectedSlot: TimeSlot | null;
  bookingDetails: BookingDetails;
  isConfirmed: boolean;
  setSelectedDate: (date: Date | null) => void;
  setSelectedSlot: (slot: TimeSlot | null) => void;
  updateBookingDetails: (details: Partial<BookingDetails>) => void;
  confirmBooking: () => void;
  resetBooking: () => void;
}

function generateSlots(): TimeSlot[] {
  const times = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
    "4:00 PM", "4:30 PM",
  ];
  return times.map((time, i) => ({
    id: `slot-${i}`,
    time,
    available: Math.random() > 0.35,
  }));
}

export const AVAILABLE_SLOTS = generateSlots();

export const useBookingStore = create<BookingState>((set) => ({
  selectedDate: null,
  selectedSlot: null,
  bookingDetails: {
    date: null,
    slot: null,
    name: "",
    email: "",
    notes: "",
  },
  isConfirmed: false,
  setSelectedDate: (date) =>
    set({ selectedDate: date, selectedSlot: null }),
  setSelectedSlot: (slot) =>
    set((state) => ({
      selectedSlot: slot,
      bookingDetails: { ...state.bookingDetails, slot },
    })),
  updateBookingDetails: (details) =>
    set((state) => ({
      bookingDetails: { ...state.bookingDetails, ...details },
    })),
  confirmBooking: () => set({ isConfirmed: true }),
  resetBooking: () =>
    set({
      selectedDate: null,
      selectedSlot: null,
      isConfirmed: false,
      bookingDetails: { date: null, slot: null, name: "", email: "", notes: "" },
    }),
}));

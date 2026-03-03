"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import { MiniCalendar } from "@/components/booking/MiniCalendar";
import { SlotPicker } from "@/components/booking/SlotPicker";
import { useBookingStore } from "@/stores/bookingStore";
import { captureEvent } from "@/utils/posthog";
import { staggerContainer, staggerItem } from "@/lib/motion";

interface BookPageClientProps {
  username?: string;
}

export function BookPageClient(_props: BookPageClientProps) {
  const { selectedDate, selectedSlot, bookingDetails, updateBookingDetails, confirmBooking, isConfirmed, resetBooking } =
    useBookingStore();
  const [step, setStep] = useState<"pick" | "details" | "done">("pick");

  const handleNext = () => {
    if (!selectedDate || !selectedSlot) return;
    setStep("details");
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    confirmBooking();
    captureEvent("booking_confirmed", { slot: selectedSlot?.time });
    setStep("done");
    toast.success("Booking confirmed! 🎉");
  };

  const handleReset = () => {
    resetBooking();
    setStep("pick");
  };

  if (step === "done" || isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 px-4"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-400/20 flex items-center justify-center">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <h2 className="text-xl font-bold">You&apos;re booked!</h2>
        <p className="text-muted-foreground text-sm">
          Your session on{" "}
          {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}{" "}
          at {selectedSlot?.time} has been confirmed.
        </p>
        <p className="text-xs text-muted-foreground">
          Confirmation sent to {bookingDetails.email}
        </p>
        <button
          onClick={handleReset}
          className="mt-4 px-6 py-2.5 glass rounded-xl text-sm"
        >
          Book Another Session
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="py-6 space-y-4 pb-28"
    >
      <motion.div variants={staggerItem}>
        <h1 className="text-2xl font-bold mb-1">Book a Session</h1>
        <p className="text-muted-foreground text-sm">Pick a date and time that works for you</p>
      </motion.div>

      {step === "pick" ? (
        <>
          <motion.div variants={staggerItem} className="glass rounded-2xl p-4">
            <MiniCalendar />
          </motion.div>

          <motion.div variants={staggerItem} className="glass rounded-2xl p-4">
            <SlotPicker />
          </motion.div>

          <motion.button
            variants={staggerItem}
            whileHover={selectedDate && selectedSlot ? { scale: 1.01 } : undefined}
            whileTap={selectedDate && selectedSlot ? { scale: 0.99 } : undefined}
            onClick={handleNext}
            disabled={!selectedDate || !selectedSlot}
            className="w-full py-3 bg-primary rounded-2xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {selectedSlot
              ? `Continue with ${selectedSlot.time}`
              : "Select a date and time"}
          </motion.button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass rounded-2xl p-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={16} className="text-primary" />
            <div>
              <p className="text-sm font-medium">
                {selectedDate?.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </p>
              <p className="text-xs text-muted-foreground">{selectedSlot?.time}</p>
            </div>
          </div>

          <form onSubmit={handleConfirm} className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Your Name</label>
              <input
                required
                value={bookingDetails.name}
                onChange={(e) => updateBookingDetails({ name: e.target.value })}
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Alex Johnson"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Email</label>
              <input
                required
                type="email"
                value={bookingDetails.email}
                onChange={(e) => updateBookingDetails({ email: e.target.value })}
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="alex@example.com"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Notes (optional)</label>
              <textarea
                value={bookingDetails.notes}
                onChange={(e) => updateBookingDetails({ notes: e.target.value })}
                className="mt-1 w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                rows={3}
                placeholder="What would you like to discuss?"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setStep("pick")}
                className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-primary rounded-xl text-sm font-medium"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
}

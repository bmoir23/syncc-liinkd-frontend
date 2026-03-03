"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, X, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useBookingStore } from "@/stores/bookingStore";
import { cn } from "@/lib/cn";

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
}

export function BookingDialog({ open, onClose }: BookingDialogProps) {
  const { selectedSlot, bookingDetails, updateBookingDetails, confirmBooking, resetBooking } =
    useBookingStore();
  const [step, setStep] = useState<"form" | "confirm" | "done">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("confirm");
  };

  const handleConfirm = () => {
    confirmBooking();
    setStep("done");
    toast.success("Booking confirmed! You'll receive a confirmation email shortly.");
  };

  const handleClose = () => {
    resetBooking();
    setStep("form");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                <h2 className="font-semibold">Book a Session</h2>
              </div>
              <button onClick={handleClose} className="text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
            </div>

            {step === "done" ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle size={40} className="text-emerald-400 mx-auto" />
                <h3 className="font-semibold">Booking Confirmed!</h3>
                <p className="text-sm text-muted-foreground">
                  Your session has been scheduled. Check your email for details.
                </p>
                <button
                  onClick={handleClose}
                  className="mt-4 px-6 py-2 bg-primary rounded-xl text-sm font-medium"
                >
                  Done
                </button>
              </div>
            ) : step === "confirm" ? (
              <div className="space-y-4">
                <div className="glass-dark rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Time</span>
                    <span>{selectedSlot?.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Name</span>
                    <span>{bookingDetails.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Email</span>
                    <span>{bookingDetails.email}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep("form")}
                    className="flex-1 py-2.5 border border-white/10 rounded-xl text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex-1 py-2.5 bg-primary rounded-xl text-sm font-medium"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <button
                  type="submit"
                  disabled={!selectedSlot}
                  className={cn(
                    "w-full py-2.5 rounded-xl text-sm font-medium transition-colors",
                    selectedSlot
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-white/10 text-muted-foreground cursor-not-allowed"
                  )}
                >
                  {selectedSlot ? `Book ${selectedSlot.time}` : "Select a time slot first"}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

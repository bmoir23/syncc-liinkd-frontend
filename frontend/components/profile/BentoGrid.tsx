"use client";

import { motion } from "framer-motion";
import { ProfileHeader } from "./ProfileHeader";
import { Services } from "./Services";
import { Availability } from "./Availability";
import { Testimonials } from "./Testimonials";
import { Updates } from "./Updates";
import { useUiStore } from "@/stores/uiStore";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function BentoGrid() {
  const { visibleCards } = useUiStore();

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-4 pb-28"
    >
      <ProfileHeader />

      {visibleCards.includes("services") && (
        <motion.div variants={staggerItem} className="glass rounded-2xl p-4">
          <Services />
        </motion.div>
      )}

      {visibleCards.includes("availability") && (
        <motion.div variants={staggerItem} className="glass rounded-2xl p-4">
          <Availability />
        </motion.div>
      )}

      {visibleCards.includes("testimonials") && (
        <motion.div variants={staggerItem} className="glass rounded-2xl p-4">
          <Testimonials />
        </motion.div>
      )}

      {visibleCards.includes("updates") && (
        <motion.div variants={staggerItem} className="glass rounded-2xl p-4">
          <Updates />
        </motion.div>
      )}
    </motion.div>
  );
}

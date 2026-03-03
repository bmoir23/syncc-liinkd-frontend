"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 glow"
      >
        <h2 className="text-3xl sm:text-5xl font-bold mb-4">
          Ready to get started?
        </h2>
        <p className="text-muted-foreground text-lg mb-8">
          Create your professional profile in minutes. No credit card required.
        </p>
        <Link href="/u/demo">
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary rounded-2xl font-semibold text-sm"
          >
            Try the Demo
            <ArrowRight size={16} />
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}

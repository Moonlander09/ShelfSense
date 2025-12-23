// components/Loading.tsx
"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--text-sdy)]/15 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-3 rounded-2xl bg-white/70 px-6 py-4 shadow-lg border border-slate-200"
      >
        <div className="relative h-8 w-8">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-slate-300 border-t-slate-900"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
          />
        </div>
        <p className="text-xs font-medium text-slate-600">
          Loading, please wait…
        </p>
      </motion.div>
    </div>
  );
}

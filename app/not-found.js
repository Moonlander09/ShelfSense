
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome, FiSearch } from "react-icons/fi";
import { ImFrustrated } from "react-icons/im";

export default function NotFound() {
  return (
    <main className="flex items-start justify-center py-10 px-2 ">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="w-full max-w-[420px] bg-white/70 rounded-2xl shadow-xl p-6 border border-slate-200"
      >
        <div className="flex flex-col items-center text-center gap-4 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200">
            <ImFrustrated className="h-7 w-7 text-amber-600" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Page not found
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">
              The shelf you&#39;re looking for doesn&#39;t exist or may have been moved.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 mb-5 text-xs text-slate-500">
          <p>Try one of these:</p>
          <ul className="mt-2 space-y-1.5">
            <li>• Check the URL for typos.</li>
            <li>• Go back to your pantry overview.</li>
            <li>• Add a new item to your ShelfSense pantry.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <button className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2">
              <FiHome className="h-4 w-4" />
              Back to Home
            </button>
          </Link>

          <Link href="/food">
            <button className="w-full py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 active:scale-[0.98] text-slate-800 font-medium text-sm transition-all flex items-center justify-center gap-2">
              <FiSearch className="h-4 w-4" />
              View food items
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

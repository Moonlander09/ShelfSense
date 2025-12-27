"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FiHome } from "react-icons/fi";
import { FaRegFaceGrimace } from "react-icons/fa6";

export default function UserAuthWarning() {
  return (
    <main className="flex items-start justify-center py-10 px-2">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-6 border border-slate-200"
      >
        <div className="flex flex-col items-center text-center gap-4 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 border border-amber-200">
            <FaRegFaceGrimace className="h-7 w-7 text-amber-600" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-slate-900 mb-2">
              You are not signed in
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-xs">
              This page is only available for logged-in users. Please sign in to
              access your shelves and items.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 mb-5 text-xs text-slate-500">
          <p>What you can do:</p>
          <ul className="mt-2 space-y-1.5">
            <li>• Go back to the home page.</li>
            <li>• Sign in to your account to continue.</li>
            <li>• If you don&apos;t have an account, create one first.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/">
            <button className="w-full py-3 rounded-xl bg-[var(--fresh)] active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm flex items-center justify-center gap-2">
              <FiHome className="h-4 w-4" />
              Go to Home
            </button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}

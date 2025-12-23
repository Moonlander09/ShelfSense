"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiMail, FiLock, FiLogIn, FiUserPlus } from "react-icons/fi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInRequest } from "@/helper/signinRequest";
import toast from "react-hot-toast";

export default function SignInPage() {
  const router = useRouter();
  // Local state for inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["signin"],
    mutationFn: signInRequest,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["me"] });

      toast.success(data.message || "Signed in successfully!");
      setEmail("");
      setPassword("");
      router.push("/");
    },
    onError: (error) => {
      // error.message is what we threw above
      toast.error(error.message);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };

    mutate(payload);
  };

  return (
   <main className="flex items-start justify-center py-20 px-2">
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 120, damping: 16 }}
    className="w-full max-w-[420px] bg-white/70 rounded-2xl shadow-xl p-6 border border-slate-200"
  >
    {/* Header */}
    <div className="text-center mb-6">
      <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 mb-3">
        <FiLogIn className="h-6 w-6 text-slate-500" />
      </div>
      <h1 className="text-xl font-semibold text-slate-900 leading-tight">
        Welcome back
      </h1>
      <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
        Sign in to access{" "}
        <Link href="/" className="font-semibold text-slate-900 hover:text-slate-700 transition-colors cursor-pointer">
          ShelfSense
        </Link>
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-5">
      {/* Email */}
      <label className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <span className="text-xs text-slate-400">Required</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiMail className="h-4 w-4" />
          </span>
          <input
            type="email"
            placeholder="john@example.com"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            value={email}
            disabled={isPending}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
      </label>

      {/* Password */}
      <label className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-700">Password</span>
          <span className="text-xs text-slate-400">Required</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiLock className="h-4 w-4" />
          </span>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-2xl bg-[var(--text-pmy)] hover:bg-slate-800 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>
    </form>

    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
      <p className="text-sm text-slate-500 mb-2">Don&#39;t have an account?</p>
      <Link 
        href="/signup" 
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
      >
        <FiUserPlus className="h-3.5 w-3.5" />
        Create account
      </Link>
    </div>
  </motion.div>
</main>

  );
}

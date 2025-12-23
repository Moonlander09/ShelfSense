"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiUser, FiMail, FiLock, FiUserCheck, FiLogIn } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/helper/signupRequest";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const router = useRouter();

  // Local state for inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Signup successful! Please sign in.");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      router.push("/signin");
    },
    onError: (error) => {
      toast.error(error.message || "Signup failed. Please try again.");
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { firstName, lastName, email, password, confirmPassword };
    mutate(payload);
  };

  return (
    <main className="flex items-start justify-center py-8 px-2">
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: "spring", stiffness: 120, damping: 16 }}
    className="w-full max-w-[420px] bg-white/70 rounded-2xl shadow-xl p-6 border border-slate-200"
  >
    {/* Header */}
    <div className="text-center mb-6">
      <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-[var(--fresh)]/15 border border-[var(--fresh)]  mb-3">
        <FiUserCheck className="h-6 w-6 text-[var(--fresh)] " />
      </div>
      <h1 className="text-xl font-semibold text-slate-900 leading-tight">
        Create Account
      </h1>
      <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
        Start tracking your pantry with{" "}
        <Link href="/" className="font-semibold text-slate-900 hover:text-[var(--fresh)]  transition-colors">
          ShelfSense
        </Link>
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-4">
      {/* Names */}
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-slate-700">First name</span>
            <span className="text-xs text-slate-400">Required</span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FiUser className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="John"
              className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              disabled={isPending}
            />
          </div>
        </label>

        <label className="block">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-slate-700">Last name</span>
            <span className="text-xs text-slate-400">Required</span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
              <FiUser className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Doe"
              className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              disabled={isPending}
            />
          </div>
        </label>
      </div>

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
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isPending}
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
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isPending}
          />
        </div>
      </label>

      {/* Confirm Password */}
      <label className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-700">Confirm password</span>
          <span className="text-xs text-slate-400">Required</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiLock className="h-4 w-4" />
          </span>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isPending}
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-2xl bg-[var(--fresh)]  hover:bg-[var(--fresh)]  active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Creating..." : "Create Account"}
      </button>
    </form>

    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
      <p className="text-sm text-slate-500 mb-2">Already have an account?</p>
      <Link 
        href="/signin" 
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors"
      >
        <FiLogIn className="h-3.5 w-3.5" />
        Sign in
      </Link>
    </div>
  </motion.div>
</main>

  );
}

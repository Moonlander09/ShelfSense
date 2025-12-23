"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiArrowLeft, FiLock } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordRequest } from "@/helper/updatePasswordRequest";
import toast from "react-hot-toast";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isPending} = useMutation({
    mutationKey: ["updatepassword"],
    mutationFn: updatePasswordRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully!");
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
      router.push("/");
    },
    onError: (error) => {
      // error.message is what we threw above
      toast.error(error.message);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = { oldPassword, password, confirmPassword };
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
        <FiLock className="h-6 w-6 text-slate-500" />
      </div>
      <h1 className="text-xl font-semibold leading-tight">
        Update Password
      </h1>
      <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
        Keep your account secure with a strong new password
      </p>
    </div>

    <form onSubmit={onSubmit} className="space-y-4">
      {/* Current Password */}
      <label className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-700">Current Password</span>
          <span className="text-xs text-slate-400">Required</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiLock className="h-4 w-4" />
          </span>
          <input
            type="password"
            placeholder="Enter current password"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            disabled={isPending}
          />
        </div>
      </label>

      {/* New Password */}
      <label className="block">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-medium text-slate-700">New Password</span>
          <span className="text-xs text-slate-400">Required</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiLock className="h-4 w-4" />
          </span>
          <input
            type="password"
            placeholder="Create a strong password"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
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
          <span className="text-sm font-medium text-slate-700">Confirm Password</span>
          <span className="text-xs text-slate-400">Required</span>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <FiLock className="h-4 w-4" />
          </span>
          <input
            type="password"
            placeholder="Re-enter new password"
            className="w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
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
        className="w-full py-3 rounded-xl bg-[var(--text-pmy)] hover:bg-slate-800 active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Updating..." : "Update Password"}
      </button>
    </form>

    <div className="mt-6 pt-6 border-t border-slate-100 text-center">
      <Link 
        href="/" 
        className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-[var(--text-pmy)] font-medium transition-colors"
      >
        <FiArrowLeft className="h-3.5 w-3.5" />
        Back to Home
      </Link>
    </div>
  </motion.div>
</main>

  );
}

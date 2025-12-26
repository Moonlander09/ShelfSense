import { FiLock, FiX } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { updatePasswordRequest } from "@/helper/updatePasswordRequest";
import toast from "react-hot-toast";
import { useState } from "react";

const { AnimatePresence, motion } = require("framer-motion");

function UpdatePasswordModal({ onClose }) {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isPending } = useMutation({
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
    <>
      {/* Modal content goes here */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center  justify-center px-2 mx-auto backdrop-blur-sm bg-[var(--text-sdy)]/15"
        onClick={() => onClose(false)}
      >
        <motion.div
          initial={{ y: 20, scale: 0.98, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, scale: 0.98, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl px-2 py-6 border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 border border-[var(--fresh)] text-[var(--fresh)] animate-pulse animate-pulse-500">
                <FiLock className="h-4 w-4 " />
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-tight">
                  Update Password
                </h3>
                <p className="text-xs text-[var(--text-sdy)] mt-0.5">
                  Keep your account secure with a strong new password.
                </p>
              </div>
            </div>
            <div className="self-start">
              <button
                type="button"
                onClick={() => onClose(false)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-[var(--text-sdy)] hover:text-[var(--expired)] cursor-pointer hover:scale-125 hover:border-[var(--expired)] hover:bg-[var(--expired)]/15 transition-all duration-250"
              >
                <FiX className="h-3 w-3" />
              </button>
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="w-full max-w-[420px] bg-slate-50 rounded-2xl shadow-xl px-3 py-6 border border-slate-200 space-y-4 text-xs"
          >
            {/* Current Password */}
            <label className="block">
              <div className="flex items-center justify-between mb-1.5">
                <span className=" font-medium text-slate-700">
                  Current Password
                </span>
                <span className="text-xs text-slate-400">Required</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiLock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
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
                <span className=" font-medium text-slate-700">
                  New Password
                </span>
                <span className="text-xs text-slate-400">Required</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiLock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
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
                <span className=" font-medium text-slate-700">
                  Confirm Password
                </span>
                <span className="text-xs text-slate-400">Required</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiLock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  placeholder="Re-enter new password"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-300 transition-all"
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
              className="w-full py-3 rounded-2xl bg-[var(--fresh)] active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:ring-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
}

export default UpdatePasswordModal;

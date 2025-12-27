import {  motion } from "framer-motion";
import { useState } from "react";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUserCheck,
  FiLogIn,
  FiX,
} from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { signUpRequest } from "@/helper/signupRequest";
import toast from "react-hot-toast";

function SignUpModal({ onClose, onOpen }) {
  // Local state for inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate, isPending } = useMutation({
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

  const handleSignInModal = () => {
    onClose(false);
    onOpen(true);
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
          className="w-full max-w-[420px] max-h-[90dvh] overflow-y-auto hide-scrollbar bg-white rounded-2xl shadow-xl px-2 py-6 border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 border border-[var(--fresh)] text-[var(--fresh)]   transition-all  duration-250 animate-pulse">
                <FiUserCheck className="h-4 w-4 " />
              </div>
              <div>
                <h3 className="text-lg font-semibold leading-tight">
                  Create Account
                </h3>
                <p className="text-xs text-[var(--text-sdy)] mt-0.5">
                  Start tracking your pantry with ShelfSense.
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
            className="w-full max-w-[420px] bg-slate-50 rounded-2xl shadow-xl px-3 py-6 border border-slate-200 space-y-4 text-sm"
          >
            {/* Names */}
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-slate-700">First name</span>
                  <span className="text-xs text-slate-400">Required</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <FiUser className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    disabled={isPending}
                  />
                </div>
              </label>

              <label className="block">
                <div className="flex items-center justify-between mb-1.5">
                  <span className=" font-medium text-slate-700">Last name</span>
                  <span className="text-xs text-slate-400">Required</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <FiUser className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
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
                <span className=" font-medium text-slate-700">Email</span>
                <span className="text-xs text-slate-400">Required</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiMail className="h-4 w-4" />
                </span>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
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
                <span className=" font-medium text-slate-700">Password</span>
                <span className="text-xs text-slate-400">Required</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiLock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
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
                  Confirm password
                </span>
                <span className="text-xs text-slate-400">Required</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <FiLock className="h-4 w-4" />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:border-[var(--fresh)]  transition-all disabled:opacity-50"
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

          <div className="mt-4 text-center">
            <p className="text-sm text-slate-500 mb-2">
              Already have an account?
            </p>
            <button
              onClick={handleSignInModal}
              className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
            >
              <FiLogIn className="h-3.5 w-3.5" />
              Sign in
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default SignUpModal;

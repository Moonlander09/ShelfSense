"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiLogIn, FiLogOut, FiSettings, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMe } from "@/helper/useMe";
import { useSignout } from "@/helper/useSignout";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import SignInModal from "./SignInModal";
import SignOutModal from "./SignUpModal";
import UpdatePasswordModal from "./UpdatePasswordModal";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [updatePasswordModal, setUpdatePasswordModal] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user, isPending } = useMe();
  const signout = useSignout();

  const onSignOut = () => {
    signout.mutate(undefined, {
      onSuccess: (data) => {
        queryClient.removeQueries({ queryKey: ["me"] });
        toast.success(data.message || "Signed out successfully!");
        setOpen(false);
        router.push("/");
      },
      onError: (error) => toast.error(error.message),
    });
  };

  const handleSignInModal = () => {
    setSignInOpen(true);
    setOpen(false);
  };

  return (
    <>
      {/* Floating header bar */}

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="w-full max-w-[420px] px-4 pt-4 sticky top-0 z-40"
      >
        <div className="backdrop-blur-md bg-white rounded-2xl shadow-md p-3 pl-4 flex items-center justify-between border border-slate-200  ">
          <Link
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <span className="inline-flex items-center relative">
              <div className="absolute inset-0 bg-green-200 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
              <Image
                src="/logo.png"
                alt="ShelfSense Logo"
                width={100}
                height={100}
                priority
                className="w-7 h-7 object-contain relative z-10"
              />
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent tracking-tight">
              ShelfSense
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setOpen(true)}
              aria-label="Open account menu"
              className="rounded-full focus:outline-none"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 border border-[var(--fresh)] shadow-sm text-[var(--fresh)] transition-colors">
                <FiUser className="h-5 w-5 animate-pulse [animation-duration:2s]" />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Modal / popover centered */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-2 mx-auto backdrop-blur-sm bg-[var(--color-sdy)]/15"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ y: 20, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl px-2 py-6 border border-slate-300"
              onClick={(e) => e.stopPropagation()}
            >
              {user ? (
                <div className="flex flex-col gap-7">
                  {/* Header */}
                  <div className="flex items-center pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 border border-[var(--fresh)] text-[var(--fresh)] animate-pulse ">
                        <FiUser className="h-5 w-5 " />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold truncate">
                          {user.data.firstName} {user.data.lastName}
                        </div>
                        <div className="text-xs text-[var(--text-sdy)] truncate">
                          {user.data.email}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="self-start flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 border border-slate-200 hover:text-[var(--expired)] cursor-pointer hover:scale-125 hover:border-[var(--expired)] hover:bg-[var(--expired)]/15 transition-all duration-250"
                    >
                      <FiX className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="grid gap-3">
                    <Button
                      onClick={() => setUpdatePasswordModal(true)}
                      className="w-full h-12 justify-start gap-2 rounded-2xl border text-[var(--text-sdy)] border-slate-200 hover:bg-slate-100 cursor-pointer"
                    >
                      <FiSettings className="text-[var(--text-sdy)]" />
                      <span className="text-sm">Update password</span>
                    </Button>

                    <Button
                      onClick={onSignOut}
                      variant="ghost"
                      className="w-full h-12 justify-start gap-2 rounded-2xl border border-red-100  hover:bg-[var(--color-dgr)]/15 text-[var(--color-dgr)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isPending}
                    >
                      <FiLogOut />
                      <span className="text-sm">Sign out</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="relative flex flex-col gap-5 items-center text-center">
                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="absolute right-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-slate-200 border border-slate-200 hover:text-[var(--expired)] cursor-pointer hover:scale-125 hover:border-[var(--expired)] hover:bg-[var(--expired)]/15 transition-all duration-250"
                  >
                    <FiX className="h-3 w-3" />
                  </button>

                  <div className="flex flex-col items-center gap-4 pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 border border-slate-200 hover:scale-125 transition-all duration-200 text-[var(--fresh)] hover:border-[var(--fresh)]">
                      <FiUser className="h-5 w-5  animate-pulse" />
                    </div>
                    <div className="text-lg font-semibold">
                      Welcome to ShelfSense
                    </div>
                    <div className="text-sm text-[color:var(--text-sdy)] max-w-xs">
                      Sign in to sync your pantry, save your items, and access
                      all features.
                    </div>
                  </div>

                  <div className="w-full">
                    <Button
                      className="w-full h-12 gap-2 rounded-2xl border border-slate-200 text-[var(--text-sdy)] hover:bg-slate-50 cursor-pointer"
                      onClick={handleSignInModal}
                    >
                      <FiLogIn className="h-4 w-4" />
                      <span>Sign in with credentials</span>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {signInOpen && (
          <SignInModal
            key="signin-modal"
            onClose={setSignInOpen}
            onOpen={setSignUpOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {signUpOpen && (
          <SignOutModal
            key="signup-modal"
            onOpen={setSignInOpen}
            onClose={setSignUpOpen}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {updatePasswordModal && (
          <UpdatePasswordModal
            key="updatepassword-modal"
            onClose={setUpdatePasswordModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { TbEditCircle } from "react-icons/tb";

function EditFoodItemModal({
  openEdit,
  onClose,
  onSubmit,
  isPending,
  itemData,
}) {
  const [name, setName] = useState(itemData?.name || "");

  const submit = (e) => {
    e.preventDefault();
    const data = {
      name,
    };
    onSubmit(data);
  };

  const clearHandler = (e) => {
    e.preventDefault();
    setName("");
  };

  return (
    <AnimatePresence>
      {openEdit && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-2 mx-auto backdrop-blur-sm bg-[var(--text-sdy)]/15"
          onClick={() => onClose(false)}
        >
          <motion.form
            onSubmit={submit}
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl px-3 py-6 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 border border-[var(--fresh)] text-[var(--fresh)] animate-pulse [animation-duration:2s]">
                  <TbEditCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    Edit item
                  </h3>
                  <p className="text-xs text-[var(--text-sdy)] mt-0.5">
                    You can only edit the name of the item.
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
            {/* Category & Name */}
            <div className="grid grid-cols-1 gap-3 border border-slate-200 bg-slate-50 p-3.5 rounded-2xl">
              <label>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Name</span>
                  <span className="text-[10px] text-slate-400">
                    e.g. Basmati rice, Lentils
                  </span>
                </div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </label>
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-3 pt-5">
              <Button
                type="button"
                onClick={clearHandler}
                className="flex-1 bg-[var(--expired)] text-white font-bold hover:bg-[var(--expired)]/90 cursor-pointer transition-all duration-150 shadow-xl"
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[var(--fresh)] text-white font-bold hover:bg-[var(--fresh)]/90 cursor-pointer transition-all duration-150 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed "
                disabled={isPending}
              >
                Update item
              </Button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditFoodItemModal;

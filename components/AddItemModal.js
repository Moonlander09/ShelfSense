"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiX, FiPlusCircle } from "react-icons/fi";


export default function AddItemModal({ open, onClose, onSubmit, isPending }) {
  const [category, setCategory] = useState("food");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [packets, setPackets] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState("");
  const [notes, setNotes] = useState("");
  const [count, setCount] = useState("");
  const [volume, setVolume] = useState("");
  const [contentHeight, setContentHeight] = useState("auto");
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      const height = contentRef.current.scrollHeight;
      setContentHeight(height);
    }
  }, [category]);

  const submit = (e) => {
    e.preventDefault();
    const data = {
      category,
      name,
      quantity,
      unit,
      packets,
      purchaseDate,
      expiryDate,
      notes,
      count,
      volume,
    };
    onSubmit(data);
  };

  const handleCloseModal = () => {
    setCategory("food");
    setName("");
    setQuantity("");
    setUnit("kg");
    setPackets("");
    setExpiryDate("");
    setNotes("");
    setCount("");
    setVolume("");
    setPurchaseDate(new Date().toISOString().split("T")[0]);
    onClose(false);
  }

  const clearHandler = (e) => {
    e.preventDefault();
    setCategory("food");
    setName("");
    setQuantity("");
    setUnit("kg");
    setPackets("");
    setPurchaseDate("");
    setExpiryDate("");
    setNotes("");
    setCount("");
    setVolume("");
  };

  return (
    <AnimatePresence>
      {open && (
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
            className="w-full max-w-[420px] max-h-[90dvh] overflow-y-auto hide-scrollbar bg-white rounded-2xl shadow-xl px-3 py-6 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 border  text-[var(--fresh)] border-[var(--fresh)] ">
                  <FiPlusCircle className="h-4 w-4 animate-spin [animation-duration:2s]"/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    Add new item
                  </h3>
                  <p className="text-xs text-[var(--text-sdy)] mt-0.5">
                    Track what you have before it expires.
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
            <div className="grid grid-cols-1 gap-3">
              <label className="block">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Category</span>
                  <span className="text-[10px] uppercase tracking-wide text-slate-400">
                    required
                  </span>
                </div>
                <select
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPending}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="food">Food</option>
                  <option value="household">Household</option>
                  <option value="toiletries">Toiletries</option>
                  <option value="cleaning">Cleaning</option>
                  <option value="other">Other</option>
                </select>
              </label>

              <label>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm">Name</span>
                  <span className="text-[10px] text-slate-400">
                    e.g. Basmati rice, Lentils, Soap
                  </span>
                </div>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isPending}
                  className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </label>
            </div>

            {/* Category specific fields */}
            <motion.div
              ref={contentRef}
              className="mt-5 overflow-hidden"
              animate={{ height: contentHeight }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {category === "food" ? (
                  <motion.div
                    key="food"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 grid grid-cols-2 gap-3"
                  >
                    <label>
                      <div className="text-sm mb-1">Quantity</div>
                      <Input
                        type="number"
                        min={0}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label>
                      <div className="text-sm mb-1">Unit</div>
                      <select
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        value={unit}
                        disabled={isPending}
                        onChange={(e) => setUnit(e.target.value)}
                      >
                        <option value="kg">Kilogram (kg)</option>
                        <option value="gm">Gram (gm)</option>
                        <option value="l">Liter (l)</option>
                        <option value="ml">Milliliter (ml)</option>
                      </select>
                    </label>

                    <label>
                      <div className="text-sm mb-1">Packets</div>
                      <Input
                        type="number"
                        min={1}
                        value={packets}
                        onChange={(e) => setPackets(e.target.value)}
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label>
                      <div className="text-sm mb-1">Purchase date</div>
                      <Input
                        type="date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label>
                      <div className="text-sm mb-1">Expiry date</div>
                      <Input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label className="col-span-2">
                      <div className="text-sm mb-1">Notes</div>
                      <Input
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional: brand, flavour, etc."
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isPending}
                      />
                    </label>
                  </motion.div>
                ) : (
                  <motion.div
                    key="non-food"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25 }}
                    className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 grid grid-cols-2 gap-3"
                  >
                    <label>
                      <div className="text-sm mb-1">Count</div>
                      <Input
                        type="number"
                        min={1}
                        value={count }
                        disabled={isPending}
                        required
                        onChange={(e) => setCount(e.target.value)}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label>
                      <div className="text-sm mb-1">Volume</div>
                      <Input
                        value={volume}
                        onChange={(e) => setVolume(e.target.value)}
                        placeholder="e.g. 500ml, 2L"
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label>
                      <div className="text-sm mb-1">Purchase date</div>
                      <Input
                        type="date"
                        value={purchaseDate}
                        onChange={(e) => setPurchaseDate(e.target.value)}
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label>
                      <div className="text-sm mb-1">Expiry date</div>
                      <Input
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>

                    <label className="col-span-2">
                      <div className="text-sm mb-1">Notes</div>
                      <Input
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Optional: brand, room, shelf, etc."
                        disabled={isPending}
                        className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--fresh)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </label>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {/* Actions */}
            <div className="flex justify-between gap-3 pt-5">
              <Button
                type="button"
                onClick={clearHandler}
                className="flex-1 border-slate-200 bg-[var(--expired)] text-white font-bold hover:bg-[var(--expired)]/90 cursor-pointer transition-all duration-150 shadow-xl"
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="flex-1 border-slate-200 bg-[var(--fresh)] text-white font-bold hover:bg-[var(--fresh)]/90 cursor-pointer transition-all duration-150 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed "
                disabled={isPending}
              >
                Add item
              </Button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

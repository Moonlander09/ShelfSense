import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { TbEditCircle } from "react-icons/tb";

function EditBatchModal({
  openEditBatch,
  onClose,
  onSubmit,
  batchData,
  isPending,
}) {
  const toInputDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  const [quantity, setQuantity] = useState(batchData?.quantity || "");
  const [unit, setUnit] = useState(batchData?.unit || "kg");
  const [packets, setPackets] = useState(batchData?.packets || "");
  const [purchaseDate, setPurchaseDate] = useState(
    toInputDate(batchData?.purchaseDate)
  );
  const [expiryDate, setExpiryDate] = useState(
    toInputDate(batchData?.expiryDate)
  );
  const [notes, setNotes] = useState(batchData?.notes || "");

  const submit = (e) => {
    e.preventDefault();
    const data = {
      quantity,
      unit,
      packets,
      purchaseDate,
      expiryDate,
      notes,
    };
    onSubmit(data);
  };

  const clearHandler = (e) => {
    e.preventDefault();
    setQuantity("");
    setUnit("kg");
    setPackets("");
    setPurchaseDate("");
    setExpiryDate("");
    setNotes("");
  };

  return (
    <AnimatePresence>
      {openEditBatch && (
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
            className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl py-6 px-3 border border-slate-200"
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
                    Edit batch
                  </h3>
                  <p className="text-xs text-[var(--text-sdy)] mt-0.5">
                    Edit details of this batch.
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

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 grid grid-cols-2 gap-3">
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
                  required
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
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-3 pt-5">
              <Button
                type="button"
                onClick={clearHandler}
                className="flex-1  bg-[var(--expired)] text-white font-bold hover:bg-[var(--expired)]/90 cursor-pointer transition-all duration-150 shadow-xl"
              >
                Clear
              </Button>
              <Button
                type="submit"
                className="flex-1  bg-[var(--fresh)] text-white font-bold hover:bg-[var(--fresh)]/90 cursor-pointer transition-all duration-150 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed "
                disabled={isPending}
              >
                Update Batch
              </Button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditBatchModal;

import { FiX } from "react-icons/fi";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { TbEditCircle } from "react-icons/tb";

function EditItemForNonFoodModal({
  openEdit,
  onClose,
  onSubmit,
  itemData,
  isPending,
}) {
  const toInputDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  const [name, setName] = useState(itemData?.name || "");
  const [purchaseDate, setPurchaseDate] = useState(
    toInputDate(itemData?.purchaseDate) || ""
  );
  const [expiryDate, setExpiryDate] = useState(
    toInputDate(itemData?.expiryDate) || ""
  );
  const [notes, setNotes] = useState(itemData?.notes || "");
  const [count, setCount] = useState(itemData?.count || "");
  const [volume, setVolume] = useState(itemData?.volume || "");

  const submit = (e) => {
    e.preventDefault();
    const data = {
      name,
      purchaseDate,
      expiryDate,
      notes,
      count,
      volume,
    };
    onSubmit(data);
  };

  const clearHandler = (e) => {
    e.preventDefault();

    setName("");
    setPurchaseDate("");
    setExpiryDate("");
    setNotes("");
    setCount("");
    setVolume("");
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
            className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl p-6 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-[var(--fresh)]">
                  <TbEditCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    Edit item
                  </h3>
                  <p className="text-xs text-[var(--text-sdy)] mt-0.5">
                    Edit your item details below.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onClose(false)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 border border-slate-200 cursor-pointer"
              >
                <FiX className="h-3 w-3 text-[var(--text-sdy)]" />
              </button>
            </div>

            {/* Category & Name */}
            <div className="grid grid-cols-1 gap-3">
              <label>
                <div className="flex items-center justify-between mb-2">
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

            <div className="grid grid-cols-2 gap-3 border border-slate-200 bg-slate-50 p-3.5 rounded-2xl mt-4">
              <label>
                <div className="text-sm mb-1">Count</div>
                <Input
                  type="number"
                  min={1}
                  value={count }
                  required
                  disabled={isPending}
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
            </div>

            <div className="flex justify-around gap-3 pt-4">
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

export default EditItemForNonFoodModal;

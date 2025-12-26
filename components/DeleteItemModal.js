import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { FiX } from "react-icons/fi";
import { IoAlertCircle } from "react-icons/io5";

function DeleteItemModal({ openDelete, onClose, onSubmit, isPending }) {
  return (
    <AnimatePresence>
      {openDelete && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50  mx-auto flex items-center justify-center px-2  backdrop-blur-sm bg-[var(--text-sdy)]/15"
          onClick={() => onClose(false)}
        >
          <motion.div
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 20, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 240, damping: 20 }}
            className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl px-3 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-[var(--expired)]">
                  <IoAlertCircle className="h-5 w-5 animate-bounce [animation-duration:2s]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold leading-tight">
                    Delete item
                  </h3>
                  <p className="text-xs text-[var(--text-sdy)] mt-0.5">
                    Delete this item from your inventory
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
            <div className="border border-slate-200 bg-slate-50 p-3 rounded-2xl">
              <div className=" text-sm text-[var(--text-sdy)] tracking-wide">
                Are you sure you want to delete this Item? This action cannot be
                undone.
              </div>
            </div>

            <div className="flex justify-around gap-3 pt-4">
              <Button
                onClick={() => onClose(false)}
                className="flex-1  bg-[var(--expired)] text-white font-bold hover:bg-[var(--expired)]/90 cursor-pointer transition-all duration-150 shadow-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={() => onSubmit()}
                className="flex-1 bg-[var(--fresh)] text-white font-bold hover:bg-[var(--fresh)]/90 cursor-pointer transition-all duration-150 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed "
                disabled={isPending}
              >
                Confirm
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteItemModal;

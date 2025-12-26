"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import AddItemModal from "./AddItemModal";
import { useMutation } from "@tanstack/react-query";
import { addItemRequest } from "@/helper/addItemRequest";
import toast from "react-hot-toast";

export default function AddItemButton() {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationKey: ["addItem"],
    mutationFn: addItemRequest,
    onSuccess: (data) => {
      // 1. toast from backend message
      toast.success(data.message || "Item added successfully!");

      // 2. close modal
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (payload) => {
    // payload comes from modal
    mutate(payload);
  };

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        className="px-4 mt-10"
      >
        <Button
          onClick={() => setOpen(true)}
          className="w-full h-14 rounded-2xl bg-[var(--fresh)]  hover:bg-[var(--fresh)]  active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:ring-offset-2 cursor-pointer flex items-center justify-center gap-1.5 duration-150 "
        >
          <FiPlus className="h-4 w-4" />
          <span>Add new item</span>
        </Button>
      </motion.div>

      <AddItemModal
        open={open}
        onClose={setOpen}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
}

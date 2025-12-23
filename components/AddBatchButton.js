import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { FiPlusCircle } from "react-icons/fi";
import { addBatchRequest } from "@/helper/addBatchRequest";
import AddBatchModal from "./AddBatchModal";

function AddBatchButton({ itemId }) {

  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addBatch"],
    mutationFn: (payload) => addBatchRequest(payload, itemId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["foodItem", itemId] });
      // 1. toast from backend message
      toast.success(data.message || "Batch added successfully!");

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
      <Button
       className="w-full h-14 rounded-2xl bg-[var(--fresh)]  hover:bg-[var(--fresh)]  active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--fresh)]  focus:ring-offset-2 cursor-pointer flex items-center justify-center gap-1.5 duration-150"
        onClick={() => setOpen(true)}
      >
        <FiPlusCircle className="h-5 w-5" />
        Add Batch
      </Button>

      <AddBatchModal
        open={open}
        onClose={setOpen}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
}

export default AddBatchButton;

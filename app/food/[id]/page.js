"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { getItemById } from "@/helper/getItemById"; // you implement this
import AddBatchButton from "@/components/AddBatchButton";
import EditBatchButton from "@/components/EditBatchButton";
import DeleteBatchButton from "@/components/DeleteBatchButton";
import DeleteBatchModal from "@/components/DeleteBatchModal";
import { deleteBatchRequest } from "@/helper/deleteBatchRequest";
import toast from "react-hot-toast";

import { editBatchRequest } from "@/helper/editBatchRequest";
import Breadcrumbs from "@/components/Breadcrumbs";
import EditBatchModal from "@/components/EditBatchModal";
import Loading from "@/components/Loading";
import { useMe } from "@/helper/useMe";
import { useRouter } from "next/navigation";

dayjs.extend(relativeTime);

const colorMap = {
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    accent: "text-green-700",
    dot: "bg-green-500",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    accent: "text-orange-700",
    dot: "bg-orange-500",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    accent: "text-red-700",
    dot: "bg-red-500",
  },
  expired: {
    bg: "bg-red-100",
    border: "border-red-300",
    accent: "text-red-800",
    dot: "bg-red-700",
  },
  default: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    accent: "text-slate-800",
    dot: "bg-slate-400",
  },
};

export default function FoodItemPage({ params }) {
  const [openDeleteBatch, setOpenDeleteBatch] = useState(false);
  const [openEditBatch, setOpenEditBatch] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [batchData, setBatchData] = useState(null);
  const { id } = React.use(params);

  const { data: user, isLoading: isUserLoading } = useMe();
  const router = useRouter();
  
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["foodItem", id],
    queryFn: () => getItemById(id), // should return the JSON you showed
    enabled: !!id,
  });

  // mutation for editing batch
  const { mutate: editMutate, isPending: isEditBatchPending } = useMutation({
    mutationKey: ["editFoodBatch"],
    mutationFn: (payload) => editBatchRequest(payload,id, editingItemId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["foodItem", id] });
      // Close modal
      toast.success(data.message || "Batch edited successfully!");
      setOpenEditBatch(false);
      // Optionally, you can also refetch the item data here to reflect changes
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // mutation for deleting batch
  const { mutate: deleteMutate, isPending: isDeleteBatchPending } = useMutation(
    {
      mutationKey: ["deleteFoodBatch"],
      mutationFn: () => deleteBatchRequest(id,editingItemId),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["foodItem", id] });
        // Close modal
        toast.success(data.message || "Batch deleted successfully!");
        setOpenDeleteBatch(false);
        // Optionally, you can also refetch the item data here to reflect changes
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }
  );

  // called by modal when user submits
  const handleDeleteSubmit = () => {
    deleteMutate();
  };

  // called by modal when user submits
  const handleEditSubmit = (payload) => {
    editMutate(payload);
  };

  // when clicking delete button, open modal and set id
  const openDeleteModalFor = (id) => {
    setEditingItemId(id);
    setOpenDeleteBatch(true);
  };

  // when clicking edit button, open modal and set id
  const openEditModalFor = (batch) => {
    setEditingItemId(batch._id);
    setBatchData(batch);
    setOpenEditBatch(true);
  };


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.replace("/signin");
    }
  }, [isUserLoading, user, router]);
  
  if (isUserLoading) {
    return <Loading />;
  }
  
  if (!user) {
    return null;
  }
  

  if (isLoading) {
    return (
    <Loading/>
    );
  }


  if (isError || !data || !data.data) {
    return (
      <div className="px-4 py-8 flex items-center justify-center text-sm text-red-500">
        Failed to load item.
      </div>
    );
  }

  const item = data.data;
  const headerColor = colorMap[item.color] || colorMap.default;
  const batches = item.foodBatches || [];

  return (
    <>
    <Breadcrumbs bgColor="bg-amber-50"  bgBorder="border-amber-200" textColor ="text-amber-700"/>
  
      <motion.div
        className="px-2 py-8 space-y-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* Top: item summary */}
        <motion.div
          className={`rounded-2xl border ${headerColor.border} ${headerColor.bg} p-4 shadow-sm`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${headerColor.dot} flex-shrink-0`}
            />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Food item
              </div>
              <h1 className="text-xl font-semibold text-slate-900">
                {item.name}
              </h1>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="px-2 py-1 rounded-full bg-white/70 border border-white/60">
              {batches.length} {batches.length === 1 ? "batch" : "batches"}
            </span>
            <span
              className={`px-2 py-1 rounded-full ${headerColor.accent} bg-white/60`}
            >
              Status: {item.color || "unknown"}
            </span>
            <span className="px-2 py-1 rounded-full bg-white/70 border border-white/60">
              Created: {dayjs(item.createdAt).format("DD MMM YYYY")}
            </span>
          </div>
        </motion.div>

        {/* Batches list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800">
              Batches ({batches.length})
            </h2>
          </div>

          {batches.length === 0 && (
            <div className="text-xs text-slate-500 py-4 text-center rounded-xl bg-slate-50">
              No batches added yet.
            </div>
          )}

          {batches.map((batch) => {
            const bColor = colorMap[batch.color] || colorMap.default;
            const exp = batch.expiryDate ? dayjs(batch.expiryDate) : null;
            const isExpired = exp ? exp.isBefore(dayjs()) : false;
            const expiryLabel = exp
              ? `${exp.format("DD MMM YYYY")} ${
                  isExpired ? `(${exp.fromNow()})` : `(${exp.fromNow()})`
                }`
              : "No expiry date";

            return (
              <motion.div
                key={batch._id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`rounded-2xl border ${bColor.border} ${bColor.bg} p-4 flex gap-3`}
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${bColor.dot}`}
                      />
                      <div className="text-sm font-semibold text-slate-900">
                        Batch #{batch._id.slice(-4)}
                      </div>
                    </div>
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full border bg-white/70 ${
                        isExpired || batch.color === "expired"
                          ? "text-red-700 border-red-200"
                          : "text-slate-700 border-slate-200"
                      }`}
                    >
                      {isExpired || batch.color === "expired"
                        ? "Expired"
                        : "Active"}
                    </span>
                  </div>

                  <div className="text-xs text-slate-700 mt-1">
                    <div className="flex justify-between gap-4">
                      <span>
                        Qty:{" "}
                        <span className="font-medium">
                          {batch.quantity} {batch.unit}
                        </span>
                      </span>
                      <span>
                        Packets:{" "}
                        <span className="font-medium">{batch.packets}</span>
                      </span>
                    </div>

                    <div className="mt-1 flex justify-between gap-4">
                      <span>
                        Purchase:{" "}
                        <span className="font-medium">
                          {batch.purchaseDate
                            ? dayjs(batch.purchaseDate).format("DD MMM YYYY")
                            : "—"}
                        </span>
                      </span>
                      <span>
                        Expiry:{" "}
                        <span className="font-medium">{expiryLabel}</span>
                      </span>
                    </div>

                    {batch.notes && (
                      <div className="mt-1 text-[11px] text-slate-600">
                        Notes: <span className="italic">{batch.notes}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <EditBatchButton
                    itemId={id}
                    onOpen={() => openEditModalFor(batch)}
                  />
                  <DeleteBatchButton
                    onOpen={() => openDeleteModalFor(batch._id)}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add batch button */}
        <div className="pt-2">
          <AddBatchButton itemId={id} />
        </div>
      </motion.div>
      <EditBatchModal
        key={editingItemId}
        openEditBatch={openEditBatch}
        onClose={setOpenEditBatch}
        batchData={batchData}
        onSubmit={handleEditSubmit}
        isPending={isEditBatchPending}
      />
      <DeleteBatchModal
        openDeleteBatch={openDeleteBatch}
        onClose={setOpenDeleteBatch}
        onSubmit={handleDeleteSubmit}
        isPending={isDeleteBatchPending}
      />
    </>
  );
}

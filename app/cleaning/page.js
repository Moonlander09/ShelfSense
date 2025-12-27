"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getItemsByCategory } from "@/helper/getItemsByCategory";
import Link from "next/link";
import { editItemRequest } from "@/helper/editItemRequest";
import { deleteItemRequest } from "@/helper/deleteItemRequest";
import toast from "react-hot-toast";
import EditItemButton from "@/components/EditItemButton";
import DeleteItemButton from "@/components/DeleteItemButton";
import EditItemForNonFoodModal from "@/components/EditItemForNonFoodModal";
import DeleteItemModal from "@/components/DeleteItemModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import Loading from "@/components/Loading";

import { useMe } from "@/helper/useMe";
import UserAuthWarning from "@/components/UserAuthWarning";

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
    dot: "bg-red-600",
  },
  default: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    accent: "text-slate-800",
    dot: "bg-slate-400",
  },
};

export default function CleaningItemCards() {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [itemData, setItemData] = useState(null);

  const {data:user,isLoading:isUserLoading} = useMe();


  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cleaning"],
    queryFn: () => getItemsByCategory("cleaning"),
  });

  // For Editing Item

  const { mutate: editMutate, isPending: isEditItemPending } = useMutation({
    mutationKey: ["editCleaningItem"],
    mutationFn: (payload) => editItemRequest(payload, editingItemId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cleaning"] });
      // 1. toast from backend message
      toast.success(data.message || "Item edited successfully!");

      // 2. close modal
      setOpenEdit(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // For Deleting Item

  const { mutate: deleteMutate, isPending: isDeleteItemPending } = useMutation({
    mutationKey: ["deleteCleaningItem"],
    mutationFn: () => deleteItemRequest(editingItemId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cleaning"] });
      // 1. toast from backend message
      toast.success(data.message || "Item deleted successfully!");

      // 2. close modal
      setOpenDelete(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // called by modal when user submits
  const handleEditSubmit = (payload) => {
    editMutate(payload);
  };

  // called by modal when user confirms delete
  const handleDeleteSubmit = () => {
    deleteMutate();
  };

  // when clicking edit button, open modal and set id
  const openEditModalFor = (item) => {
    setItemData(item);
    setEditingItemId(item._id);
    setOpenEdit(true);
  };

  //when clicking delete button, open modal and set id
  const openDeleteModalFor = (id) => {
    setEditingItemId(id);
    setOpenDelete(true);
  };

 if (isUserLoading) {
     return <Loading />;
   }
 
   if (!user) {
     return <UserAuthWarning />;
   }
 
   if (isLoading) {
     return <Loading />;
   }

  const items = data?.data || [];
  const total = data?.results ?? items.length;

  return (
    <>
    <Breadcrumbs bgColor="bg-indigo-50"  bgBorder="border-indigo-200" textColor ="text-indigo-700"/>
      <div className="px-2 py-8">
        {/* Page title + count */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="mb-4 flex items-baseline justify-between"
        >
          <h1 className="text-lg font-semibold">Cleaning</h1>
          <span className="text-xs text-slate-500">
            {total} {total === 1 ? "item" : "items"}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="space-y-4"
        >
          {items.length === 0 && (
            <div className="text-center text-sm text-slate-500 py-8">
              No Cleaning items yet.
            </div>
          )}

          {items.map((item) => {
            const cardColor = colorMap[item.color] || colorMap.default;

            const expiryLabel = (() => {
              if (!item.expiryDate) return "No expiry";
              const d = dayjs(item.expiryDate);
              if (d.isBefore(dayjs())) return "Expired";
              return `${d.format("DD MMM, YYYY")} (${d.fromNow()})`;
            })();

            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className={`w-full rounded-2xl border ${cardColor.border} ${cardColor.bg} shadow-sm p-4 flex items-start justify-between`}
              >
                {/* Left content (clickable later if you want) */}
                <div className="flex-1 min-w-0">
                  <Link href={`/cleaning/${item._id}`}>
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${cardColor.dot} flex-shrink-0`}
                        aria-hidden="true"
                      />
                      <div className="text-lg font-semibold text-slate-900 truncate">
                        {item.name.toUpperCase()}
                      </div>
                    </div>

                    <div className="mt-2 text-xs text-slate-600 space-y-1">
                      {item.volume && (
                        <div>
                          <span className="text-slate-500">Volume: </span>
                          <span className="font-medium">{item.volume}</span>
                        </div>
                      )}

                      <div>
                        <span className="text-slate-500">Expiry: </span>
                        <span className={`${cardColor.accent} font-medium`}>
                          {expiryLabel}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Actions */}
                <div className="ml-3 flex flex-col items-end gap-2">
                  <EditItemButton onOpen={() => openEditModalFor(item)} />

                  <DeleteItemButton
                    onOpen={() => openDeleteModalFor(item._id)}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <EditItemForNonFoodModal
        key={editingItemId}
        openEdit={openEdit}
        itemData={itemData}
        onClose={setOpenEdit}
        onSubmit={handleEditSubmit}
        isPending={isEditItemPending}
      />
      <DeleteItemModal
        openDelete={openDelete}
        onClose={setOpenDelete}
        onSubmit={handleDeleteSubmit}
        isPending={isDeleteItemPending}
      />
    </>
  );
}

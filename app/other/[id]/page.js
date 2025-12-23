"use client";

import React from "react";

import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { getItemById } from "@/helper/getItemById"; 
import NonFoodItemPage from "@/components/NonFoodItemPage";
import Loading from "@/components/Loading";

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

export default function OtherItemPage({ params }) {
 const { id } = React.use(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["householdItem", id],
    queryFn: () => getItemById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
     <Loading/>
    );
  }

  if (isError || !data || !data.data) {
    return (
      <div className="px-4 py-10">
        <div className="text-center text-sm text-red-500">
          Item not found or an error occurred.
        </div>
      </div>
    );
  }

  const item = data.data;
  const cmap = colorMap[item.color] || colorMap.default;
  const exp = item.expiryDate ? dayjs(item.expiryDate) : null;
  const isExpired = exp ? exp.isBefore(dayjs()) : false;

  return (
   <NonFoodItemPage key={id} item={item} cmap={cmap} isExpired={isExpired}  bgColor="bg-slate-50"  bgBorder="border-slate-200" textColor ="text-slate-700"/>
  );
}



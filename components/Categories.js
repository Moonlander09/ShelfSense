"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FiCoffee, FiHome, FiSmile, FiDroplet, FiBox } from "react-icons/fi";
import Link from "next/link";

// add color styles per category
const categories = [
  {
    id: "food",
    label: "Food",
    icon: FiCoffee,
    bg: "bg-amber-50",
    border: "border-amber-200",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
  },
  {
    id: "household",
    label: "Household",
    icon: FiHome,
    bg: "bg-sky-50",
    border: "border-sky-200",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    id: "toiletries",
    label: "Toiletries",
    icon: FiSmile,
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    id: "cleaning",
    label: "Cleaning",
    icon: FiDroplet,
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-700",
  },
  {
    id: "other",
    label: "Other",
    icon: FiBox,
    bg: "bg-slate-100",
    border: "border-slate-200",
    iconBg: "bg-slate-200",
    iconColor: "text-slate-900",
  },
];

export default function Categories() {
  return (
 <motion.div
  initial={{ y: 60, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ type: "spring", stiffness: 120, damping: 18 }}
  className=" mx-2 my-8 px-6 py-8 rounded-2xl shadow-md bg-white border border-slate-200 "
>
  <div className="flex items-center justify-center gap-2 mb-8 opacity-80">
    <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-slate-400"></div>
    <h2 className="text-sm uppercase tracking-widest font-bold text-slate-500">Categories</h2>
    <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-slate-400"></div>
  </div>

  <div className="grid grid-cols-2 gap-4">
    {categories.map((cat) => {
      const Icon = cat.icon;
      return (
        <motion.div
          key={cat.id}
          whileTap={{ scale: 0.97 }}
          whileHover={{ y: -2 }}
          className="w-full "
        >
          <Link href={`/${cat.id}`}>
            <Button
              className={`w-full h-24 rounded-2xl shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-2 border-2 ${cat.border} transition-all duration-300 group relative overflow-hidden bg-white hover:border-transparent`}
            >
              {/* Subtle gradient background that appears on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${cat.bg.replace('bg-', 'from-white to-')}/30`}></div>
              
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110 duration-300 ${cat.iconBg} ${cat.iconColor}`}
              >
                <Icon className={`h-5 w-5`} />
              </span>
              <span className="relative z-10 text-sm font-semibold text-slate-600 group-hover:text-slate-800 transition-colors">
                {cat.label}
              </span>
            </Button>
          </Link>
        </motion.div>
      );
    })}
  </div>
</motion.div>

  );
}

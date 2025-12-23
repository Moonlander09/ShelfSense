"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FiHome, FiChevronRight } from "react-icons/fi";

export default function Breadcrumbs({bgColor, bgBorder, textColor}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment) => {
    // Truncate long IDs
    if (segment.length > 15 && /^[a-zA-Z0-9]+$/.test(segment)) {
      return `${segment.slice(0, 6)}...${segment.slice(-4)}`;
    }
    return segment.replace(/-/g, " ");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-2 pt-4"
    >
      <div className="flex items-center flex-wrap gap-2 px-4 py-3 bg-white/70 rounded-2xl border border-slate-200 shadow-xl text-[var(--text-sdy)]">
        <Link href="/" className="group">
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-8 h-8 rounded-xl shadow-sm  bg-slate-100 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer hover:border-slate-400"
          >
            <FiHome className="w-4 h-4 hover:text-slate-600" />
          </motion.div>
        </Link>

        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label = formatSegment(segment);

          return (
            <div key={href} className="flex items-center gap-2">
              <FiChevronRight className="w-4 h-4 " />

              {isLast ? (
                <span className={`${bgBorder} ${bgColor} ${textColor} "  border px-3 py-1.5 rounded-xl  text-sm font-semibold shadow-md capitalize whitespace-nowrap" `}>
                  {label}
                </span>
              ) : (
                <Link href={href}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:bg-slate-50 hover:text-slate-600 text-sm font-medium  hover:border-slate-400 transition-all capitalize cursor-pointer shadow-sm whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </motion.nav>
  );
}

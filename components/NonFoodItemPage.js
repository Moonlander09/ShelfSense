import { motion } from "framer-motion";
import dayjs from "dayjs";
import Breadcrumbs from "./Breadcrumbs";

function NonFoodItemPage({item,cmap,isExpired,bgColor,bgBorder,textColor}) {

    return (
      <>
      <Breadcrumbs bgColor={bgColor}  bgBorder={bgBorder} textColor={textColor}/>
            <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="px-2 py-6"
    >
      <div className={`rounded-2xl  p-4 ${cmap.bg} ${cmap.border} border  `}>
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${cmap.dot} `} />
              <div className="text-lg font-bold text-slate-900">
                {item.name.toUpperCase()}
              </div>
            </div>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full border bg-white/70 ${
                isExpired || item.color === "expired"
                  ? "text-red-700 border-red-200"
                  : "text-slate-700 border-slate-200"
              }`}
            >
              {isExpired || item.color === "expired" ? "Expired" : "Active"}
            </span>
          </div>
          <div className="text-sm text-slate-700 mt-2">
            <div className="flex justify-between gap-4">
              <span>
                Count: <span className="font-medium">{item.count}</span>
              </span>
              <span>
                Volume: <span className="font-medium">{item.volume}</span>
              </span>
            </div>

            <div className="mt-2 flex justify-between gap-4">
              <span>
                Purchase:{" "}
                <span className="font-medium">
                  {item.purchaseDate
                    ? dayjs(item.purchaseDate).format("DD MMM YYYY")
                    : "—"}
                </span>
              </span>
              <span>
                Expiry:{" "}
                <span className="font-medium">
                  {" "}
                  {item.purchaseDate
                    ? dayjs(item.purchaseDate).format("DD MMM YYYY")
                    : "—"}
                </span>
              </span>
            </div>

            {item.notes && (
              <div className="mt-2 text-[13px] text-slate-600">
                Notes: <span className="italic">{item.notes}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
    </>
    )
}

export default NonFoodItemPage

import { categories } from "@/db/categories";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Category from "./Category";

export default function Categories() {
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  return (
    <div className="mx-auto mt-24 w-full max-w-7xl px-4 md:px-10 2xl:px-4">
      <ul className="relative flex flex-col gap-8 divide-slate-200 rounded-2xl md:flex-row md:items-center md:gap-0 md:divide-x-[1.5px] md:shadow-md">
        {categories.map((category) => (
          <Category
            singleCategory={category}
            key={category.id}
            setIsCategoriesHovered={setIsCategoriesHovered}
          />
        ))}

        <AnimatePresence>
          {isCategoriesHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-none absolute inset-0 hidden rounded-2xl bg-black/10 backdrop-blur-sm md:block"
            />
          )}
        </AnimatePresence>
      </ul>
    </div>
  );
}

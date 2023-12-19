import { Button } from "@/components/ui/button";
import { CategoryLink } from "@/types/categoryLink";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

type SingleCategoryType = {
  id: number;
  title: string;
  description: string;
  icon: string;
  href: CategoryLink;
};

type CategoryProps = {
  singleCategory: SingleCategoryType;
  setIsCategoriesHovered: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Category({
  singleCategory,
  setIsCategoriesHovered,
}: CategoryProps) {
  const [isCategoryHovered, setIsCategoryHovered] = useState(false);

  return (
    <li
      className={`${
        singleCategory.id === 1 && "md:rounded-bl-2xl md:rounded-tl-2xl"
      } ${
        singleCategory.id === 7 && "md:rounded-br-2xl md:rounded-tr-2xl"
      } flex-1`}
    >
      <Link
        to={`${
          singleCategory.href === "in-construction"
            ? "/" : singleCategory.href === "https://www.lasepa.aceall.io" ? "https://www.lasepa.aceall.io"
            : `/category/${singleCategory.href}`
        }`}
        className={`rounded-xl md:rounded-none ${
          singleCategory.id === 1 && "md:rounded-bl-2xl md:rounded-tl-2xl"
        } ${
          singleCategory.id === 7 && "md:rounded-br-2xl md:rounded-tr-2xl"
        } relative flex bg-white px-5 py-6 md:h-60 md:items-center md:justify-center md:px-3 md:py-0`}
        onMouseEnter={() => {
          setIsCategoriesHovered(true);
          setIsCategoryHovered(true);
        }}
        onMouseLeave={() => {
          setIsCategoriesHovered(false);
          setIsCategoryHovered(false);
        }}
      >
        <div className="flex w-full flex-col gap-3 md:w-auto md:items-center md:gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-black/5 md:h-20 md:w-20">
            <img
              src={singleCategory.icon}
              alt={singleCategory.title}
              className="h-6 w-6 md:h-10 md:w-10"
            />
          </div>

          <p className="mt-1 text-lg font-medium text-[#212121] md:mt-0 md:text-center md:text-base">
            {singleCategory.title}
          </p>

          <p className="text-black/80 md:hidden">
            {singleCategory.description}
          </p>

          <Button className="mt-2 bg-[#2d7034] md:hidden">Visit</Button>

          <AnimatePresence>
            {isCategoryHovered && (
              <motion.div
                className="absolute -bottom-4 -left-14 -right-14 -top-4 z-10 hidden md:block"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative flex h-full w-full flex-col justify-center gap-4 overflow-hidden rounded-xl bg-white px-4 py-2 text-center shadow-md">
                  <h2 className="font-semibold text-[#DC3837]">
                    {singleCategory.title}
                  </h2>

                  <p className="text-black/80">{singleCategory.description}</p>

                  <div className="absolute bottom-0 left-0 h-2 w-full bg-[#DC3837]"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
    </li>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

type FaqProps = {
  singleFaq: FAQ;
};

export default function Faq({ singleFaq }: FaqProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      onClick={() => {
        isOpen ? setIsOpen(false) : setIsOpen(true);
      }}
      className="relative flex cursor-pointer items-start gap-3"
    >
      <div className="pt-1 text-lg text-[#DC3837]">
        <BsQuestionCircleFill />
      </div>

      <div>
        <p className="font-semibold text-[#212121]">{singleFaq.question}</p>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <p className="pt-2 text-sm font-medium text-[#212121] md:pt-1 md:text-base">
                {singleFaq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="ml-auto text-[#212121]">
        {isOpen ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
      </div>
    </li>
  );
}

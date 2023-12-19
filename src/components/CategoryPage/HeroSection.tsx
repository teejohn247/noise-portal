import { CategoryLink } from "@/types/categoryLink";
import { IoIosArrowBack } from "react-icons/io";
import { NavLink } from "react-router-dom";

type Category = {
  id: number;
  title: string;
  description: string;
  icon: string;
  href: CategoryLink;
  imagePath: string;
};

type HeroSectionProps = {
  category: Category;
};

export default function HeroSection({ category }: HeroSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center gap-10 px-4 py-14 text-center text-white md:flex-1 md:gap-12 md:px-0 md:py-0">
      <img
        src={category.imagePath}
        alt={category.title}
        className="absolute -z-10 h-full w-full object-cover brightness-50"
      />

      <NavLink
        className="absolute left-3 top-4 z-10 flex items-center gap-1 transition-colors hover:text-[#DC3837] md:left-6 md:gap-2"
        to={"/"}
      >
        <div className="text-2xl">
          <IoIosArrowBack />
        </div>

        <p className="text-sm font-medium md:text-base">Go Back</p>
      </NavLink>

      <h2 className="relative max-w-xl pt-6 text-4xl font-semibold before:absolute before:-bottom-2 before:left-1/2 before:h-[2.5px] before:w-1/6 before:-translate-x-1/2 before:bg-[#DC3837] md:pt-0 md:text-5xl md:before:-bottom-3 md:before:h-[3px] md:before:w-1/5">
        {category.title}
      </h2>

      <p className="text-sm font-medium md:px-8 md:text-base 2xl:px-12">
        {category.description}
      </p>
    </section>
  );
}

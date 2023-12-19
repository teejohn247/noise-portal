import Logo from "@/assets/images/lasepa.png";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { FaPersonWalkingArrowRight } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header className="relative mx-auto flex max-w-7xl items-center justify-between px-4 pt-3 text-white md:px-8 2xl:px-0">
      <Link to={"/"} className="z-50">
        <img src={Logo} alt="logo" className="h-12 w-auto md:h-16" />
      </Link>

      <nav className="hidden md:block">
        <ul className="flex items-center gap-6 font-medium">
          <li>
            <Link
              to={"mailto:info@lasepa.gov.ng"}
              className="transition-colors hover:text-[#DC3837]"
            >
              <p>Contact Us</p>
            </Link>
          </li>

          <li className="relative py-1 pl-2 text-center before:absolute before:left-0 before:top-1/2 before:h-full before:w-[1px] before:-translate-y-1/2 before:bg-white">
            <Link
              to={"https://www.lasepa.gov.ng/"}
              target="_blank"
              className="flex items-center gap-2 transition-colors hover:text-[#DC3837]"
            >
              <FaPersonWalkingArrowRight />

              <p>Back to Home</p>
            </Link>
          </li>

          <li className="pl-4">
            <Link to={"/login"}>
              <Button className="bg-[#378a3f] px-8">Login</Button>
            </Link>
          </li>
        </ul>
      </nav>

      {isNavOpen && (
        <nav className="fixed inset-0 z-10 block bg-white md:hidden">
          <ul className="flex flex-col gap-2 px-4 pt-28 text-center font-medium text-[#212121]">
            <li className="relative py-4 text-lg font-semibold before:absolute before:-bottom-0 before:left-0 before:h-[1.75px] before:w-full before:bg-[#212121]/50">
              <Link to={"/about"}>
                <p>About Lasepa</p>
              </Link>
            </li>

            <li className="relative py-4 text-lg font-semibold before:absolute before:-bottom-0 before:left-0 before:h-[1.75px] before:w-full before:bg-[#212121]/50">
              <Link
                to={"https://www.lasepa.gov.ng/"}
                target="_blank"
                className="flex justify-center"
              >
                <p className="relative">
                  <span>Back to Home</span>

                  <div className="absolute -right-8 top-1">
                    <div className="relative before:absolute before:-right-1 before:top-1/2 before:h-full before:w-[1px] before:-translate-y-1/2 before:bg-[#212121]">
                      <FaPersonWalkingArrowRight />
                    </div>
                  </div>
                </p>
              </Link>
            </li>
          </ul>

          <li className="absolute bottom-8 w-full px-4">
            <Link to={"/login"}>
              <Button className="w-full bg-[#378a3f] px-8 py-6 text-lg">
                Login
              </Button>
            </Link>
          </li>
        </nav>
      )}

      {isNavOpen ? (
        <button
          className="z-50 block text-3xl text-[#212121]/50 md:hidden"
          onClick={() => setIsNavOpen(false)}
        >
          <FaTimes />
        </button>
      ) : (
        <button
          className="block text-3xl md:hidden"
          onClick={() => setIsNavOpen(true)}
        >
          <GiHamburgerMenu />
        </button>
      )}
    </header>
  );
}

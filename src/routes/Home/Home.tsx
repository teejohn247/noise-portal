import Bg from "@/assets/images/bg.jpg";
import Categories from "@/components/Portal/Categories/Categories";
import Footer from "@/components/Portal/Footer/Footer";
import Header from "@/components/Portal/Header/Header";
import Search from "@/components/Portal/Search/Search";

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute -z-10 h-[30rem] w-full overflow-hidden bg-gradient-to-t from-[#066f36] via-[rgb(103,184,104)] to-[rgba(103,184,104,0.25)] md:h-96 md:bg-gradient-to-l">
        <img
          src={Bg}
          alt="lasepa"
          className="h-full w-full -scale-x-[1] object-cover brightness-50"
        />
      </div>

      <Header />

      <Search />

      <Categories />

      <Footer />
    </div>
  );
}

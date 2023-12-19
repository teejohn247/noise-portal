// import { FormEvent, useState } from "react";
// import { FaSearch } from "react-icons/fa";

export default function Search() {
  //   const [searchItem, setSearchItem] = useState("");

  //   function handleSubmit(event: FormEvent<HTMLFormElement>) {
  //     event.preventDefault();
  //   }

  return (
    <div className="flex flex-col items-center gap-6 px-4 pt-20 text-center text-white md:gap-5 md:px-0 md:pt-16">
      <h1 className="text-4xl font-semibold md:text-5xl">
        Welcome to Lasepa Portal
      </h1>

      <p className="text-base font-medium md:text-lg">
        Discover and explore a variety of categories. Find the information you
        need seamlessly.
      </p>

      {/* <form
        onSubmit={handleSubmit}
        className="relative flex w-full max-w-4xl items-center rounded-full bg-white/20 px-6 py-3"
      >
        <input
          type="search"
          placeholder="Search Categories"
          value={searchItem}
          onChange={(event) => setSearchItem(event.target.value)}
          className="w-full bg-transparent text-white outline-none placeholder:text-white"
        />

        <button type="submit" className="absolute right-5">
          <FaSearch />
        </button>
      </form> */}
    </div>
  );
}

import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header({ active }: { active: any }) {
  function handleActive() {
    active(true);
  }

  return (
    <header className=" flex items-center mx-6 pt-4 border-b border-[#e5e4e5] pb-2">
      <h1 className="text-xl inline-block shrink-0 font-semibold">MangaArt</h1>
      <div className="flex items-center justify-end grow ">
        <div className="flex items-center text-lg bg-[] relative ">
          <AiOutlineSearch className="mx-4 text-2xl" onClick={handleActive} />
          <AiFillGithub className="text-2xl" />
        </div>
      </div>
    </header>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { queryManga } from "@/components/queryManga";
import { AiFillGithub } from "react-icons/ai";
import Searchbar from "@/components/searchbar";
import Collage from "@/components/collage";

export default function App() {
  const [chapter, setChapter] = useState<any>([]);
  const baseUrl = "https://api.mangadex.org";
  // function handleRef(e: any) {
  //   if (e.target === overlay.current) {
  //     setSearchBarActive(false);
  //   }
  // }

  return (
    <div className="relative">
      {/* {chapter ? (
        <Images
          baseUrl={baseUrl}
          chapterID={chapter}
          images={images}
          setImages={setImages}
        />
      ) : null}{" "}
      {searchBarActive && (
        <div
          className="absolute w-full h-full px-5 top-0 pt-4 backdrop-sepia	bg-[#0003]"
          onClick={handleRef}
          ref={overlay}
        ></div>
      )} */}
      <Searchbar chapter={chapter} setChapter={setChapter} />
      <Collage chapterID={chapter} baseUrl={baseUrl} />
      {/* <Scramble /> */}
    </div>
  );
}

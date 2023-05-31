"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { queryManga, getChapters } from "@/components/queryManga";
import { AiFillGithub } from "react-icons/ai";
import Searchbar from "@/components/searchbar";
import Image from "next/image";
import Loader from "@/components/Loader";
import Images from "@/components/Images";

export default function App() {
  const [chapter, setChapter] = useState("");
  const [images, setImages] = useState([]);
  const [chapterImages, setChapterImages] = useState("");

  const overlay = useRef<any>();

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
      <Searchbar />
    </div>
  );
}

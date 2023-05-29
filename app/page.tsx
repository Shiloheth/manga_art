"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { queryManga } from "@/components/queryManga";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Loader from "@/components/Loader";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const baseUrl = "https://api.mangadex.org";
  const overlay = useRef<any>();

  console.log(data);

  const handleChange = (e: any) => {
    const value = e.target.value;
    queryManga(baseUrl, value, setData);
    setSearchQuery(value);
    setIsLoading(true);
  };

  function handleActive() {
    setSearchBarActive(!searchBarActive);
  }
  function handleRef(e: any) {
    console.log(e);
    if (e.target === overlay.current) {
      setSearchBarActive(!searchBarActive);
    }
  }

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // Perform any asynchronous operations here (e.g., API calls)
      setIsLoading(false);
    }, 1200); // Specify the desired debounce delay (in milliseconds)

    return () => {
      clearTimeout(debounceTimer); // Clear the debounce timer on component unmount or when the input value changes
    };
  }, [isLoading]);

  const result =
    data &&
    data.map((item: any, idx: any) => (
      <div key={idx} className="flex items-center">
        <Image
          alt=""
          src={`https://uploads.mangadex.org/covers/${item.id}/${item.coverArt.attributes.fileName}`}
          width={50}
          height={50}
        />
        <div className="text-black font-semibold">{item.title.en}</div>
      </div>
    ));

  return (
    <div className="relative h-screen">
      <header className=" flex items-center mx-2 pt-4 border-b border-[#e5e4e5] pb-2">
        <h1 className="text-xl inline-block shrink-0 font-semibold">
          MangaArt
        </h1>
        <div className="flex items-center justify-end grow ">
          <div className="flex items-center text-lg bg-[] relative ">
            <AiOutlineSearch className="mx-4 text-2xl" onClick={handleActive} />
            {/* <input
              className="bg-[#000000] pl-5 b-0 font-light"
              onChange={handleChange}
              value={searchQuery}
              placeholder="Search..."
              onClick={handleActive}
            /> */}
            <AiFillGithub className="text-2xl" />
          </div>
          {/* <div className="absolute top-[40px] bg-[#ffffff]">
            {searchQuery.length ? (
              isLoading ? (
                <Loader />
              ) : data.length === 0 ? (
                <div className="text-black">no search results</div>
              ) : (
                result
              )
            ) : null}
          </div> */}
        </div>
      </header>

      {searchBarActive && (
        <div
          className="absolute w-full h-full px-5 top-0 pt-4 backdrop-sepia	bg-[#0003]"
          onClick={handleRef}
          ref={overlay}
        >
          <div className="bg-[#FF0000] h-full w-full ">
            {" "}
            <div className="blur-2xl h-full w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}

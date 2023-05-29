"use client";

import { useCallback, useEffect, useState } from "react";
import { queryManga } from "@/components/queryManga";
import { AiFillGithub } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Loader from "@/components/Loader";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const baseUrl = "https://api.mangadex.org";

  const handleChange = (e: any) => {
    const value = e.target.value;
    queryManga(baseUrl, value, setData);
    setSearchQuery(value);
    setIsLoading(true);
  };

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
      <div key={idx}>
        <Image
          alt=""
          src={`https://uploads.mangadex.org/covers/${item.id}/${item.coverArt.attributes.fileName}`}
          width={70}
          height={70}
        />
      </div>
    ));

  return (
    <>
      <header className="flex items-center flex-1">
        <h1 className="flex flex-1">Manga Art</h1>
        <div className="flex items-center ">
          <div className="flex items-center text-lg bg-[] relative mr-64">
            <AiOutlineSearch className="absolute" />
            <input
              className="bg-[#000000] pl-5 b-0"
              onChange={handleChange}
              value={searchQuery}
              placeholder="Search..."
            />
          </div>
          <div className="absolute top-[40px] bg-[#ffffff]">
            {searchQuery.length ? (
              isLoading ? (
                <Loader />
              ) : data.length === 0 ? (
                <div className="text-black">no search results</div>
              ) : (
                result
              )
            ) : null}
          </div>
          <AiFillGithub className="text-4xl" />
        </div>
      </header>
      <button onClick={() => setData([])}>query</button>

      <div className="grid grid-cols-3"></div>
    </>
  );
}

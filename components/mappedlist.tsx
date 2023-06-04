import Image from "next/image";
import axios from "axios";

import { useState } from "react";
import Collage from "./collage";

export default function Mappedlist({
  searchData,
  setSearchBarActive,
  setSearchQuery,
  chapter,
  setChapter,
}: {
  searchData: any;
  setSearchBarActive: any;
  setSearchQuery: any;
  chapter: any;
  setChapter: any;
}) {
  const [loadingStates, setLoadingStates] = useState(
    Array(searchData.length).fill(true)
  );

  const handleImageLoad = (idx: any) => {
    const nextList = [...loadingStates];
    nextList[idx] = false;
    setLoadingStates(nextList);
  };
  const baseUrl = "https://api.mangadex.org";

  console.log(chapter);

  async function getChapters(baseUrl: any, mangaID: any) {
    const resp = await axios({
      method: "GET",
      url: `${baseUrl}/manga/${mangaID}/feed`,
    });
    const ran = Array(10).fill(Math.floor(Math.random() * 10));
    const result = ran.map((_, idx) => resp.data.data[idx].id);
    console.log(result);
    setChapter(result);
  }

  const mappedList =
    searchData &&
    searchData.map((item: any, idx: any) => {
      return (
        <div
          key={idx}
          className="flex items-center"
          onClick={() => {
            getChapters(baseUrl, item.id);
            setSearchQuery("");
            setSearchBarActive(false);
          }}
        >
          <div className="relative h-[45px] w-[45px]">
            <Image
              onLoadingComplete={() => handleImageLoad(idx)}
              alt=""
              src={`https://uploads.mangadex.org/covers/${item.id}/${item.coverArt.attributes.fileName}`}
              fill={true}
            />
            {loadingStates[idx] ? (
              <div className="absolute">.loading</div>
            ) : null}
          </div>

          <div className="text-black font-semibold">{item.title.en}</div>
        </div>
      );
    });
  return <>{mappedList}</>;
}

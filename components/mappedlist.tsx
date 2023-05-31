import Image from "next/image";
import { getChapters } from "./queryManga";
import { useState } from "react";

export default function Mappedlist({ searchData }: { searchData: any }) {
  const [loadingStates, setLoadingStates] = useState(
    Array(searchData.length).fill(true)
  );

  const handleImageLoad = (idx: any) => {
    const nextList = [...loadingStates];
    nextList[idx] = false;
    setLoadingStates(nextList);
    console.log(nextList);
  };

  const mappedList =
    searchData &&
    searchData.map((item: any, idx: any) => {
      return (
        <div
          key={idx}
          className="flex items-center"
          onClick={() => {
            // getChapters(baseUrl, item.id, setChapter);
            // setSearchQuery("");
            // setSearchBarActive(false);
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

import axios from "axios";
import { useState } from "react";
import Image from "next/image";

export default function Images({
  baseUrl,
  chapterID,
  images,
  setImages,
}: {
  baseUrl: any;
  chapterID: any;
  images: any;
  setImages: any;
}) {
  const [hash, setHash] = useState("");
  (async function getChapterImages() {
    const resp = await axios({
      method: "GET",
      url: `${baseUrl}/at-home/server/${chapterID}`,
    });

    setHash(resp.data.chapter.hash);
    setImages(resp.data.chapter.data);
  })();

  return (
    <div className="grid grid-cols-1 gap-4 overflow-hidden min-h-full">
      {images.map((image: any, idx: number) => (
        <div className="relative auto-rows-auto h-96 w-full" key={idx}>
          <Image
            className="absolute object-contain object-center hover:scale-[1.1] ease-in-out duration-700"
            src={`https://uploads.mangadex.org/data/${hash}/${image}`}
            alt=""
            fill={true}
          />
        </div>
      ))}
    </div>
  );
}

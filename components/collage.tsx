import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Collage({
  baseUrl,
  chapterID,
}: {
  baseUrl: any;
  chapterID: any;
}) {
  const [hash, setHash] = useState<any>([]);
  const [shots, setShots] = useState([]);
  const [display, setDisplay] = useState(false);
  const array: any = [];

  async function getChapterImages(chap: any) {
    const resp = await axios({
      method: "GET",
      url: `${baseUrl}/at-home/server/${chap}`,
    });
    console.log(resp);
    array.push({
      hash: resp.data.chapter.hash,
      imageData:
        resp.data.chapter.data[
          Math.floor(Math.random() * resp.data.chapter.data.length)
        ],
    });

    console.log(array);
  }

  function test() {
    console.log(chapterID);
    chapterID.forEach((_: any) => getChapterImages(_));
  }

  return (
    <>
      <button onClick={test}>clicccckkkk mmmmeeee</button>

      <div className="grid grid-cols-1 gap-4 overflow-hidden min-h-full">
        {display
          ? array.map(
              (
                { hash, imageData }: { hash: any; imageData: any },
                idx: number
              ) => (
                <div className="relative auto-rows-auto h-96 w-full" key={idx}>
                  <Image
                    className="absolute object-contain object-center hover:scale-[1.1] ease-in-out duration-700"
                    src={`https://uploads.mangadex.org/data/${hash}/${imageData}`}
                    alt=""
                    fill={true}
                  />
                </div>
              )
            )
          : null}
      </div>
    </>
  );
}

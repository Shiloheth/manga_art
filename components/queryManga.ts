import axios from "axios";

export async function queryManga(baseUrl: string, title: string, setData: any) {
  const resp = await axios({
    method: "GET",
    url: `${baseUrl}/manga`,
    params: {
      limit: 5,
      title: title,
      includes: ["cover_art"],
    },
  });

  const data = resp.data.data;

  const result = data.map((item: any, idx: any) => {
    const { relationships, attributes } = item;
    const coverArt = relationships.find((obj: any) => obj.type === "cover_art");
    const { id } = item;
    const { title } = attributes;
    return { id, coverArt, title };
  });

  setData(result);
}

export async function getChapters(baseUrl: any, mangaID: any, setChapter: any) {
  const resp = await axios({
    method: "GET",
    url: `${baseUrl}/manga/${mangaID}/feed`,
  });
  console.log(resp.data.data[0].id);
  setChapter(resp.data.data[0].id);
}

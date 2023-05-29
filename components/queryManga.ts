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
  console.log(data);
  const result = data.map((item: any, idx: any) => {
    const { relationships } = item;
    const coverArt = relationships.find((obj: any) => obj.type === "cover_art");
    const { id } = item;
    return { id, coverArt };
  });

  setData(result);
}

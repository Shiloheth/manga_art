import { useState, useEffect } from "react";
import Header from "./header";
import Mappedlist from "./mappedlist";
import { queryManga, getChapters } from "@/components/queryManga";
import Loader from "./Loader";
import { AiOutlineSearch } from "react-icons/ai";

export default function Searchbar() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<any>([]);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const baseUrl = "https://api.mangadex.org";

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      clearTimeout(debounceTimer); // Clear the debounce timer on component unmount or when the input value changes
    };
  }, [isLoading]);

  function handleChange(e: any) {
    const value = e.target.value;
    queryManga(baseUrl, value, setSearchData);
    setSearchQuery(value);
    setIsLoading(true);
  }

  return (
    <>
      <Header active={setSearchBarActive} />

      {/* if the search icon on the header is clicked render a search bar field element */}
      {searchBarActive && (
        <div className="absolute w-full h-full px-5 top-0 pt-4 backdrop-sepia	bg-[#0003]">
          <div className="bg-[#222] h-full w-full ">
            {" "}
            <div className="flex items-center bg-[#383838]">
              <AiOutlineSearch className="text-xl mx-2" />
              <input
                className="grow bg-[#383838] outline-none h-12"
                placeholder="Search"
                onChange={handleChange}
                value={searchQuery}
              />
            </div>
            <div className="bg-[#222]">
              {/* if there is input in the search bar render a loader that wiil last for 1.2s then check if there was any data from the api request, if there was display it as a list */}

              {searchQuery.length ? (
                isLoading ? (
                  <Loader />
                ) : searchData.length === 0 ? (
                  <div className="text-black bg-">no search results</div>
                ) : (
                  <Mappedlist searchData={searchData} />
                )
              ) : null}
            </div>
            <div className="blur-2xl h-full w-full"></div>
          </div>
        </div>
      )}
    </>
  );
}

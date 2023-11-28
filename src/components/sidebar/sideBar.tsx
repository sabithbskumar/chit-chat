import { useState } from "react";
import SearchIcon from "~icons/material-symbols/search";
import { FloatingSearchInput } from "./floatingSearchInput";

function SideBar() {
  const names = ["one", "two", "three", "four", "five", "six", "seven"];

  const [searchString, setSearchString] = useState("");

  return (
    <div className="grow max-w-[400px] m-auto h-full bg-[#0001] backdrop-blur backdrop-saturate-[180%] border border-[#0001] shadow-xl rounded-md overflow-hidden">
      <div className="flex flex-col gap-2 p-2 pr-0 pb-16 gutter-stable max-h-full overflow-y-auto">
        {names.some((val) => val.toString().includes(searchString)) ? (
          names
            .filter((val) => val.toString().includes(searchString))
            .map((name, i) => {
              return (
                <button
                  key={i}
                  className="text-left text-gray-600 font-bold p-3 bg-[#fffa] backdrop-saturate-[800%] backdrop-blur rounded flex gap-2"
                >
                  <span className="h-12 w-12 bg-blue-500 text-white rounded cursor-default leading-[3rem] text-center">
                    {name.charAt(0).toUpperCase()}
                  </span>
                  <span className="grow text-left leading-[3rem]">{name}</span>
                </button>
              );
            })
        ) : (
          <span className="p-3 text-white">
            {searchString == "" ? "No Messages" : "No Matches"}
          </span>
        )}
      </div>
      <FloatingSearchInput
        value={searchString}
        onInput={(e) => setSearchString(e.target.value)}
        icon={<SearchIcon className="h-full w-auto" />}
      ></FloatingSearchInput>
    </div>
  );
}

export { SideBar };

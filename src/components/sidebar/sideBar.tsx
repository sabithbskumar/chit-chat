import { ChangeEvent, useState } from "react";

function SideBar() {
  const names = ["one", "two", "three", "four", "five", "six", "seven"];

  const [searchString, setSearchString] = useState("");

  return (
    <div className="grow max-w-[400px] m-auto h-full bg-[#0001] backdrop-blur backdrop-saturate-[180%] border border-[#0001] shadow-xl rounded-md relative overflow-hidden">
      <div className="flex flex-col gap-2 p-2 pr-0 pb-16 gutter-stable max-h-full overflow-y-auto">
        {names
          .filter((val) => val.toString().includes(searchString))
          .map((name, i) => {
            return (
              <div
                key={i}
                className="text-gray-600 font-bold py-3 px-3 bg-[#fffa] backdrop-saturate-[800%] backdrop-blur rounded"
              >
                <a href="/">{name}</a>
              </div>
            );
          })}
      </div>
      <input
        type="text"
        className="fixed bg-white bottom-2 left-2 right-2 h-12 p-3 rounded placeholder:text-black outline-none focus:ring ring-[#fff4] max-w-[3rem] valid:max-w-full focus-within:max-w-full hover:max-w-full transition [transition:.3s]"
        placeholder="&#x1F50D;"
        required
        value={searchString}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchString(e.target.value)
        }
      />
    </div>
  );
}

export { SideBar };

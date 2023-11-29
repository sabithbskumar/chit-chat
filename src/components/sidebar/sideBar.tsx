import { useState } from "react";
import ArrowLeftIcon from "~icons/material-symbols/chevron-left-rounded";
import ArrowRightIcon from "~icons/material-symbols/chevron-right-rounded";
function SideBar() {
  const names = [
    "user one",
    "user two",
    "user three",
    "user four",
    "user five",
    "user six",
    "user seven",
  ];

  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`shrink-0 group/user md:max-w-xs lg:max-w-sm overflow-hidden bg-[#0001] backdrop-blur backdrop-saturate-[180%] border border-[#0001] shadow-xl rounded-none md:rounded-md ${
        isActive ? "w-full" : "w-min lg:w-full"
      }`}
    >
      <div className="flex flex-col gap-2 p-2 pr-0 gutter-stable pb-16 md:pb-24 max-h-full max-w-full overflow-hidden overflow-y-auto">
        {names.map((name, i) => {
          return (
            <button
              key={i}
              title={name}
              className={`w-full h-14 md:h-20 text-gray-600 font-bold md:p-3 bg-[#fffa] rounded flex gap-4`}
            >
              <span className="shrink-0 h-14 w-14 bg-blue-500 text-white rounded cursor-default leading-[3.5rem] text-center">
                {name.charAt(0).toUpperCase()}
              </span>
              <span
                className={`overflow-hidden text-left whitespace-nowrap leading-[3.5rem] text-ellipsis ${
                  isActive ? "block" : "hidden lg:block"
                }`}
              >
                {name}
              </span>
            </button>
          );
        })}
        <button
          className="lg:hidden fixed bottom-2 w-14 h-14 md:w-20 md:h-20 p-4 left-2 right-2 group/toggle"
          onClick={() => setIsActive(!isActive)}
        >
          {isActive ? (
            <ArrowLeftIcon className="w-full h-full rounded bg-white bg-opacity-50 hover:bg-opacity-100" />
          ) : (
            <ArrowRightIcon className="w-full h-full rounded bg-white bg-opacity-50 hover:bg-opacity-100" />
          )}
        </button>
      </div>
    </div>
  );
}

export { SideBar };

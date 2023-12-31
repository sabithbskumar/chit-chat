import { useState } from "react";
import ArrowLeftIcon from "~icons/material-symbols/chevron-left-rounded";
import ArrowRightIcon from "~icons/material-symbols/chevron-right-rounded";

function SideBar({
  members,
}: {
  members: Record<string, { name: string; count: number }>;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`shrink-0 group/user md:max-w-xs lg:max-w-sm overflow-hidden bg-[#0001] backdrop-blur backdrop-saturate-[180%] border border-[#0001] shadow-xl rounded-none md:rounded-md transition-all ${
        isActive ? "w-full" : "w-[4.625rem] md:w-[6.125rem] lg:w-full"
      }`}
    >
      <div className="flex flex-col gap-2 p-2 pr-0 gutter-stable pb-16 md:pb-24 lg:pb-2 max-h-full max-w-full overflow-hidden overflow-y-auto">
        {Object.entries(members).map(([id, user]) => {
          return (
            <button
              key={id}
              title={user.name}
              className={`w-full h-14 md:h-20 text-gray-600 font-bold md:p-3 rounded flex gap-4${
                isActive ? " bg-[#fffa]" : " md:bg-[#fffa]"
              }`}
            >
              <span className="shrink-0 h-14 w-14 bg-gradient-to-tr from-sky-500 to-indigo-500 text-white rounded cursor-default leading-[3.5rem] text-center">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span
                className={`overflow-hidden text-left whitespace-nowrap leading-[3.5rem] text-ellipsis ${
                  isActive ? "block" : "hidden lg:block"
                }`}
              >
                {user.name}
              </span>
            </button>
          );
        })}
        <button
          className="lg:hidden fixed bottom-2 w-14 h-14 md:w-20 md:h-20 p-4 left-2 right-2 group/toggle"
          onClick={() => setIsActive(!isActive)}
          aria-label="toggle sidebar"
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

import LogoutIcon from "~icons/material-symbols/logout-rounded";

function Header({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  return (
    <>
      <div className="flex justify-between font-medium text-4xl py-3 px-3 bg-[#0005] backdrop-blur backdrop-saturate-[180%] shadow-xl text-slate-100">
        <a href="/">ChitChat</a>
        {isLoggedIn && (
          <button
            aria-label="logout"
            onClick={() => {
              fetch("/logout").then(() => {
                document.location.reload();
              });
            }}
          >
            <LogoutIcon className="h-full w-auto" />
          </button>
        )}
      </div>
    </>
  );
}

export { Header };

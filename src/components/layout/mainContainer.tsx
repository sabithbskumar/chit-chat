import { ReactNode } from "react";
import { Header } from "../header";

interface MainContainerProps {
  children?: ReactNode;
  className?: string;
  isLoggedIn?: boolean;
}

function MainContainer({
  children,
  className = "",
  isLoggedIn = false,
}: MainContainerProps) {
  return (
    <div className="backdrop-blur-lg h-full">
      <div className="h-full flex flex-col">
        <Header isLoggedIn={isLoggedIn} />
        <div
          className={`grow overflow-hidden p-0 md:p-3 flex gap-0 md:gap-3 ${className}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export { MainContainer };

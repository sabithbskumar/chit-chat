import { ReactNode } from "react";

interface GlassContainerProps {
  children?: ReactNode;
  className?: string;
}

function GlassContainer({ children, className = "" }: GlassContainerProps) {
  return (
    <div
      className={`grow m-auto h-full bg-black bg-opacity-0 backdrop-blur backdrop-saturate-[180%] border border-[#0001] shadow-xl md:rounded-md overflow-hidden max-w-full ${className}`}
    >
      {children}
    </div>
  );
}

export { GlassContainer };

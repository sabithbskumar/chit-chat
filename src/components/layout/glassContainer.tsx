import { ReactNode } from "react";

interface GlassContainerProps {
  children?: ReactNode;
  className?: string;
}

function GlassContainer({ children, className = "" }: GlassContainerProps) {
  return (
    <div
      className={`grow m-auto h-full bg-[#0000] backdrop-blur backdrop-saturate-[180%] border border-[#0001] shadow-xl rounded-md overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export { GlassContainer };

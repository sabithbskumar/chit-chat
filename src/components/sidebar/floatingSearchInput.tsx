import { ChangeEvent, ReactNode } from "react";

function FloatingSearchInput({
  type = "text",
  placeholder = "",
  name = "",
  value,
  onInput,
  icon,
}: {
  type?: string;
  placeholder?: string;
  name?: string;
  value: string;
  onInput: (_: ChangeEvent<HTMLInputElement>) => void;
  icon?: ReactNode;
}) {
  return (
    <>
      <div
        className={`box-border [transition:.3s] rounded fixed bottom-2 left-2 hover:right-2 focus-within:right-2 h-12 flex${
          value != "" ? " right-2" : ""
        }`}
      >
        <div className="h-full p-3 pointer-events-none absolute">{icon}</div>
        <input
          className={`bg-white rounded hover:w-full focus-within:w-full p-2 transition [transition:.3s] pl-10 outline-none focus:ring ring-[#fff4] ${
            value == "" ? "w-12" : "w-full"
          }`}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onInput={onInput}
        ></input>
      </div>
    </>
  );
}
export { FloatingSearchInput };

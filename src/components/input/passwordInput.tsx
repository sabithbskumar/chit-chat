import { ChangeEvent, useState } from "react";

function PasswordInput({
  placeholder = "Password",
  className = "",
  name,
  value,
  onInput,
}: {
  placeholder: string;
  className: string;
  value: string;
  name: string;
  onInput: (_: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={`${className.replace("focus", "focus-within")} flex gap-2`}>
      <input
        type={isVisible ? "text" : "password"}
        className="w-full h-full outline-none"
        placeholder={placeholder}
        onInput={onInput}
        value={value}
        name={name}
      />
      <button
        className="outline-none focus:font-bold"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export { PasswordInput };

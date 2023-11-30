import { ChangeEvent, useState } from "react";

function PasswordInput({
  placeholder = "Password",
  className = "",
  name,
  value,
  onChange,
  required = false,
}: {
  placeholder: string;
  className: string;
  name: string;
  value: string;
  onChange: (_: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={`${className.replace("focus", "focus-within")} flex gap-2`}>
      <input
        type={isVisible ? "text" : "password"}
        className="w-full h-full outline-none"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        required={required}
        minLength={6}
      />
      <button
        type="button"
        className="outline-none focus:font-bold"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"}
      </button>
    </div>
  );
}

export { PasswordInput };

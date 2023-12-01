import EyeOnIcon from "~icons/material-symbols/visibility-rounded";
import EyeOffIcon from "~icons/material-symbols/visibility-off-rounded";
import { ChangeEvent, useState } from "react";

function PasswordInput({
  placeholder = "Password",
  className = "",
  name,
  value,
  onChange,
  required = false,
  minLength = 0,
}: {
  placeholder: string;
  className: string;
  name: string;
  value: string;
  onChange: (_: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  minLength?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div
      className={`${className.replace(
        "focus",
        "focus-within"
      )} pr-0 flex gap-2`}
    >
      <input
        type={isVisible ? "text" : "password"}
        className="w-full h-full outline-none"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={32}
      />
      <button
        type="button"
        aria-label="show password"
        className="rounded-full px-4"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? <EyeOffIcon /> : <EyeOnIcon />}
      </button>
    </div>
  );
}

export { PasswordInput };

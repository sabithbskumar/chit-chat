import { ChangeEvent, useState } from "react";
import { PasswordInput } from "../../components/input/passwordInput";
import { GlassContainer, MainContainer } from "../../components/layout";

function SignUpPage() {
  const inputClass =
    "text-slate-800 bg-white outline-none focus:ring-4 ring-blue-500 shrink-0 px-6 block max-w-[400px] mx-auto w-full rounded-full h-12";
  const buttonClass =
    "bg-blue-700 hover:bg-blue-500 outline-none focus:ring-4 ring-blue-500 shrink-0 px-6 block max-w-[400px] mx-auto w-full rounded-full h-12 font-bold";
  const anchorClass =
    "outline-none focus:ring-4 ring-blue-500 shrink-0 text-gray-200 text-center font-semibold py-3 px-1 max-w-[400px] mx-auto w-full h-12 hover:text-blue-500 rounded-full";

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <MainContainer className="flex gap-3 max-w-4xl w-full m-auto">
        <GlassContainer className="flex flex-col">
          <form
            className="shrink-0 flex flex-col gap-6 py-2 px-4 h-full overflow-auto text-slate-100 backdrop-blur-sm bg-[#0004]"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <span className="grow shrink-0"></span>
            <h2 className="text-center text-4xl font-bold py-8">Sign Up</h2>
            <input type="text" placeholder="Name" className={inputClass} />
            <input type="email" placeholder="Email" className={inputClass} />
            <PasswordInput
              placeholder="Password"
              className={inputClass}
              name="password"
              value={formData.password}
              onInput={handleChange}
            />
            <PasswordInput
              placeholder="Confirm Password"
              className={inputClass}
              name="confirmPassword"
              value={formData.confirmPassword}
              onInput={handleChange}
            />
            <input
              type="submit"
              className={buttonClass}
              value={"Create Account"}
            />
            <span className="w-full text-center font-medium text-gray-300">
              Already have an account?
              <a
                href="/login"
                className={`focus:ring-transparent focus:text-blue-500 ${anchorClass}`}
              >
                Log In
              </a>
            </span>
            <span className="grow shrink-0"></span>
          </form>
        </GlassContainer>
      </MainContainer>
    </>
  );
}

export { SignUpPage };

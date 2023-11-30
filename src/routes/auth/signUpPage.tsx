import { ChangeEvent, FormEvent, useState } from "react";
import { PasswordInput } from "../../components/input/passwordInput";
import { GlassContainer, MainContainer } from "../../components/layout";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const inputClass =
    "text-slate-800 bg-white outline-none focus:ring-4 ring-blue-500 shrink-0 px-6 block max-w-[400px] mx-auto w-full rounded-full h-12";
  const buttonClass =
    "disabled:bg-blue-400 bg-blue-700 hover:bg-blue-500 outline-none focus:ring-4 ring-blue-500 shrink-0 px-6 block max-w-[400px] mx-auto w-full rounded-full h-12 font-bold dis";
  const anchorClass =
    "outline-none focus:ring-4 ring-blue-500 shrink-0 text-gray-200 text-center font-semibold py-3 px-1 max-w-[400px] mx-auto w-full h-12 hover:text-blue-500 rounded-full";

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{ [key: string]: string }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (hasSubmitted) return;
    for (const key in formData) {
      if (formData[key].trim() == "") {
        setError("Please fill all the values");
        return;
      } else setError("");
    }
    if (formData.password != formData.confirmPassword) {
      setError("Passwords does not match");
      return;
    }
    setHasSubmitted(true);
    fetch("/api/signup", {
      method: "post",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((j) => {
        console.log(j);
        if (j.code == 200) {
          setMessage(j.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          setError(j.message);
          setHasSubmitted(false);
        }
      })
      .catch((e) => {
        setError("Server Error");
        console.log(e);
        setHasSubmitted(false);
      });
  }

  return (
    <>
      <MainContainer className="max-w-4xl w-full m-auto">
        <GlassContainer className="flex flex-col">
          <form
            autoComplete="off"
            className="shrink-0 flex flex-col gap-6 py-2 px-4 h-full overflow-auto text-slate-100 backdrop-blur-sm bg-[#0004]"
            onSubmit={handleSubmit}
          >
            <span className="grow shrink-0"></span>
            <h2 className="text-center text-4xl font-bold py-8">Sign Up</h2>
            <input
              type="text"
              placeholder="Name"
              className={inputClass}
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className={inputClass}
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <PasswordInput
              placeholder="Password"
              className={inputClass}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required={true}
            />
            <PasswordInput
              placeholder="Confirm Password"
              className={inputClass}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required={true}
            />
            {error != "" && (
              <span className="text-center text-red-400 font-bold">
                {error}
              </span>
            )}
            {message != "" && (
              <span className="text-center text-green-400 font-bold">
                {message}
              </span>
            )}
            <input
              type="submit"
              className={buttonClass}
              disabled={hasSubmitted}
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

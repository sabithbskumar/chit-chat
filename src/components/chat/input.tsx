import { FormEvent, useState } from "react";
import SendIcon from "~icons/material-symbols/send-rounded";

export function MessageInput({ onSend }: { onSend: (_: string) => void }) {
  const [inputMessage, setInputMessage] = useState("");

  function handleSend(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputMessage.trim() == "") return;
    onSend(inputMessage);
    setInputMessage("");
  }
  return (
    <>
      <form className="shrink-0 m-2 flex gap-2 relative" onSubmit={handleSend}>
        <input
          className="grow p-3 pr-12 text-black rounded-md outline-none focus-within:ring-4 ring-blue-500"
          type="text"
          maxLength={2000}
          placeholder="Enter your message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1 top-1 bottom-1 bg-blue-500 rounded-md"
        >
          <SendIcon className="h-full w-auto p-2" />
        </button>
      </form>
    </>
  );
}

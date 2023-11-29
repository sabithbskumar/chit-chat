import { useState } from "react";
import { MessageInput } from "./input";
import { Messages } from "./messages";

export interface MessageI {
  id: number;
  userId: string;
  userName: string;
  message: {
    type: "text";
    content: string;
  };
}

function messageTemplate(message: string): MessageI {
  return {
    id: Date.now(),
    userId: "233",
    userName: "user name",
    message: {
      type: "text",
      content: message,
    },
  };
}

export function Layout() {
  const [messages, setMessages] = useState<MessageI[]>([]);

  function onSend(message: string) {
    const messageObj = messageTemplate(message);
    setMessages([messageObj, ...messages]);
  }

  return (
    <>
      <div className="h-full w-full flex flex-col">
        <div className="grow text-white bg-blue-900 bg-opacity-0 overflow-hidden overflow-y-auto max-h-full h-full flex flex-col">
          <Messages messages={messages} />
          <MessageInput onSend={onSend} />
        </div>
      </div>
    </>
  );
}

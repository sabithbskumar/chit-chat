import { MessageInput } from "./input";
import { MessageI, Messages } from "./messages";

export function Layout({
  onSendMessage,
  messages,
}: {
  onSendMessage: (_: string) => void;
  messages: MessageI[];
}) {
  function onSend(message: string) {
    onSendMessage(message);
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

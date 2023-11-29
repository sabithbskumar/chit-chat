import { MessageI } from "./layout";

export function Messages({ messages }: { messages: MessageI[] }) {
  return (
    <>
      <div className="grow m-2 mr-0 gutter-stable overflow-hidden overflow-y-auto flex gap-1 flex-col-reverse rounded-sm">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`bg-blue-800 max-w-fit rounded-md px-6 py-3 bg break-all ${
              message.id % 2 == 0 ? "self-end" : ""
            }`}
          >
            <span>{message.message.content}</span>
          </div>
        ))}
      </div>
    </>
  );
}

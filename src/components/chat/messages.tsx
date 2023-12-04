export interface MessageI {
  id: number;
  uid: string;
  name: string;
  message: string;
}

export function Messages({ messages }: { messages: MessageI[] }) {
  const { id, name } = parseCookies(document.cookie);
  console.log(id, name);

  return (
    <div className="grow m-2 mr-0 gutter-stable overflow-hidden overflow-y-auto flex gap-1 flex-col-reverse rounded-sm">
      {messages.map((message) => (
        <div key={message.id} className="flex flex-col relative">
          {message.uid.toString() != id && (
            <p className="text-sm font-bold">{message.name}</p>
          )}
          <div
            key={message.id}
            className={`max-w-fit rounded-lg px-6 py-3 mb-3 break-all bg-gradient-to-tr after:content-[attr(data-time)] after:text-xs after:absolute after:-bottom-0.5 after:w-max after:opacity-0 hover:after:opacity-100 after:transition-opacity ${
              message.uid.toString() == id
                ? "ml-4 self-end from-cyan-500 to-blue-500 after:right-1 after:text-right"
                : "mr-4 ml-2 from-green-500 to-emerald-500 after:left-3"
            }`}
            data-time={new Date(message.id).toLocaleTimeString()}
          >
            <p>{message.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type Cookie = Record<string, string>;

function parseCookies(cookieString: string) {
  const cookies: Cookie = {};
  cookieString.split(";").forEach((cookie) => {
    const [key, value] = cookie.split("=");
    cookies[key.trim()] = value ? decodeURIComponent(value.trim()) : "";
  });
  return cookies;
}

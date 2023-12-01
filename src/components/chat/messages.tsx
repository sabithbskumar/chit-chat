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
    <>
      <div className="grow m-2 mr-0 gutter-stable overflow-hidden overflow-y-auto flex gap-1 flex-col-reverse rounded-sm">
        {messages.map((message) => (
          <>
            <div key={message.id} className="flex flex-col group/message">
              {message.uid.toString() != id && (
                <p className="text-sm font-bold">{message.name}</p>
              )}
              <div
                key={message.id}
                className={`max-w-fit rounded-lg px-6 py-3 break-all bg-gradient-to-tr bg-opacity-60 ${
                  message.uid.toString() == id
                    ? "ml-4 self-end from-cyan-500 to-blue-500"
                    : "mr-4 ml-2 from-green-500 to-emerald-500"
                }`}
              >
                <p>{message.message}</p>
              </div>
              {message.uid.toString() != id ? (
                <p className="opacity-0 group-hover/message:opacity-100 transition-opacity hover:block pl-3 text-xs">
                  {new Date(message.id).toLocaleTimeString()}
                </p>
              ) : (
                <p className="opacity-0 group-hover/message:opacity-100 transition-opacity text-right text-xs">
                  {new Date(message.id).toLocaleTimeString()}
                </p>
              )}
            </div>
          </>
        ))}
      </div>
    </>
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

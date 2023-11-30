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
            <div
              key={message.id}
              className={`max-w-fit rounded-md px-6 py-3 bg break-all bg-opacity-60 ${
                message.uid.toString() == id
                  ? "self-end bg-blue-500 "
                  : "bg-green-500"
              }`}
            >
              {message.uid.toString() != id && (
                <p className="font-bold underline">
                  {message.name}
                  {"\n"}
                </p>
              )}
              <p>{message.message}</p>
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

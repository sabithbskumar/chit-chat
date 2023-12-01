import { useEffect, useRef, useState } from "react";
import "./App.css";
import { ChatLayout } from "./components/chat";
import { GlassContainer, MainContainer } from "./components/layout";
import { SideBar } from "./components/sidebar";
import { MessageI } from "./components/chat/messages";
import svgLogo from "./assets/logo-animated.svg";

const URL = window.location.origin.replace("http", "ws");

function App() {
  const webSocket = useRef<WebSocket | null>(null);
  const [members, setMembers] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<MessageI[]>([]);

  function sendMessage(message: string) {
    if (!webSocket.current) return;
    webSocket.current.send(JSON.stringify({ message }));
  }

  useEffect(() => {
    if (webSocket) {
      webSocket.current?.close();
      webSocket.current = null;
    }
    webSocket.current = new WebSocket(URL);

    const onOpen = () => {
      console.log("onopen");

      fetch("/api/get_members")
        .then((r) => r.json())
        .then((j) => setMembers(j));
      fetch("/api/get_messages")
        .then((r) => r.json())
        .then((j) => setMessages(j.reverse()));
    };

    const onMessage = ({ data }: MessageEvent) => {
      const jsonMessage = JSON.parse(data);
      switch (jsonMessage.type) {
        case "join":
          setMembers((prev) => {
            return { ...prev, [jsonMessage.id]: jsonMessage.name };
          });
          break;
        case "message":
          setMessages((prev) => [jsonMessage.message, ...prev]);
          break;
        case "left":
          setMembers((prev) => {
            const newMembers = { ...prev };
            delete newMembers[jsonMessage.id];
            return newMembers;
          });
          break;
      }
      console.log("onmessage");
      console.log(jsonMessage);
      console.log(jsonMessage.type);
    };
    const onClose = () => console.log("onclose");
    const onError = () => console.log("onerror");
    webSocket.current.addEventListener("open", onOpen);
    webSocket.current.addEventListener("close", onClose);
    webSocket.current.addEventListener("message", onMessage);
    webSocket.current.addEventListener("error", onError);

    return () => {
      if (webSocket.current) {
        webSocket.current.removeEventListener("open", onOpen);
        webSocket.current.removeEventListener("close", onClose);
        webSocket.current.removeEventListener("message", onMessage);
        webSocket.current.removeEventListener("error", onError);
        webSocket.current.close();
        webSocket.current = null;
        console.log("closed");
      }
    };
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  function Loader() {
    console.log("render Loader");
    return (
      <div className="absolute z-20 top-0 backdrop-saturate-[100%] bottom-0 left-0 right-0">
        <object
          className="w-[50%] max-w-[20rem] h-full m-auto"
          type="image/svg+xml"
          data={svgLogo}
        ></object>
      </div>
    );
  }
  useEffect(() => {
    const timer = setTimeout(
      () => {
        setIsLoading(false);
        sessionStorage.setItem("loaded", "true");
      },
      sessionStorage.getItem("loaded") === "true" ? 1300 : 1500
    );
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <MainContainer isLoggedIn={true}>
          <SideBar members={members} />
          <GlassContainer>
            <ChatLayout onSendMessage={sendMessage} messages={messages} />
          </GlassContainer>
        </MainContainer>
      )}
    </>
  );
}

export { App };

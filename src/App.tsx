import "./App.css";
import { ChatLayout } from "./components/chat";
import { GlassContainer, MainContainer } from "./components/layout";
import { SideBar } from "./components/sidebar";

function App() {
  return (
    <MainContainer>
      <SideBar />
      <GlassContainer>
        <ChatLayout />
      </GlassContainer>
    </MainContainer>
  );
}

export default App;

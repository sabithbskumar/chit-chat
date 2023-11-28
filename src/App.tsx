import "./App.css";
import { GlassContainer, MainContainer } from "./components/layout";
import { SideBar } from "./components/sidebar";

function App() {
  return (
    <MainContainer className="flex gap-3">
      <SideBar />
      <GlassContainer />
    </MainContainer>
  );
}

export default App;

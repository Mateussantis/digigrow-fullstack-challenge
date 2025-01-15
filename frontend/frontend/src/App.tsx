import { TaskProvider } from "./contexts/tasks";
import { Home } from "./pages/home";
import { GlobalStyle } from "./styles/global-style";

function App() {
  return (
    <>
      <GlobalStyle />
      <TaskProvider>
        <Home />
      </TaskProvider>
    </>
  );
}

export default App;

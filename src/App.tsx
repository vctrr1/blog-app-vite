import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/nav-bar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen pt-20">
        <NavBar />
        <div className="container mx-auto px-5 py-5">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

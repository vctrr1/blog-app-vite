import { Route, Routes } from "react-router";
import Home from "./pages/home";
import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/nav-bar";
import CreatePost from "./pages/create-post";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen pt-20">
        <NavBar />
        <div className="container mx-auto px-5 py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

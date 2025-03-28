import { Route, Routes } from "react-router";
import Home from "./pages/home";
import { ThemeProvider } from "./components/theme-provider";
import NavBar from "./components/nav-bar";
import CreatePost from "./pages/create-post";
import Post from "./pages/post";
import CreateCommunities from "./pages/create-communities";
import CommunitiesPage from "./pages/communities";
import PostsCommunity from "./pages/posts-community";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen pt-20">
        <NavBar />
        <div className="px-5 py-2 container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/community/create" element={<CreateCommunities />} />
            <Route path="/community/:id" element={<PostsCommunity />} />
            <Route path="/communities" element={<CommunitiesPage />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

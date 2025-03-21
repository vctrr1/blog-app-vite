import { useState } from "react";
import { Link, useLocation } from "react-router";
import ToggleTheme from "./toggle-theme";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { signInWithGitHub, signOut, user } = useAuth();
  const displayName = user?.user_metadata.user_name;

  return (
    <nav className="fixed top-0 w-full z-40  border-b">
      <div className="max-w-5xl mx-auto px-4">
        <div className=" flex justify-between h-16 items-center">
          <Link to="/" className="font-mono text-xl font-bold">
            blog<span className="text-purple-500">.app</span>
          </Link>

          {/** Desktop links */}
          <div className="items-center space-x-8 hidden md:flex">
            <Link
              to={"/"}
              className={`${
                location.pathname === "/" ? "text-muted-foreground" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to={"/create"}
              className={`${
                location.pathname === "/create" ? "text-muted-foreground" : ""
              }`}
            >
              Criar Post
            </Link>
            <Link
              to={"/communities"}
              className={`${
                location.pathname === "/communities"
                  ? "text-muted-foreground"
                  : ""
              }`}
            >
              Comunidades
            </Link>
            <Link
              to={"/community/create"}
              className={`${
                location.pathname === "/community/create"
                  ? "text-muted-foreground"
                  : ""
              }`}
            >
              Criar Comunidades
            </Link>
            <ToggleTheme />
          </div>

          {/* desltop auth */}
          <div className="hidden md:flex items-center">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <img
                    src={user.user_metadata?.avatar_url}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>{displayName}</DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut />
                    <button onClick={signOut}>Sair</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" onClick={signInWithGitHub}>
                <LogIn />
                Entrar
              </Button>
            )}
          </div>

          {/** Mobile menu button */}
          <div className="md:hidden gap-8 flex">
            <ToggleTheme />
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-foreground focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/** Mobile links */}
      {menuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background">
            <Link to={"/"} className="block px-3 py-2 rounded-md text-base">
              Home
            </Link>
            <Link
              to={"/create"}
              className="block px-3 py-2 rounded-md text-base"
            >
              Criar Post
            </Link>
            <Link
              to={"/communities"}
              className="block px-3 py-2 rounded-md text-base "
            >
              Comunidades
            </Link>
            <Link
              to={"/community/create"}
              className="block px-3 py-2 rounded-md text-base"
            >
              Criar Comunidades
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

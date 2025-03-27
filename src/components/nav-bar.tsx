import { useState } from "react";
import { Link, useLocation } from "react-router";
import ToggleTheme from "./toggle-theme";
import { useAuth } from "@/hooks/use-auth";

import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import UserAccountIcon from "./user-account-icon";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { signInWithGitHub, signOut, user } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-40  border-b bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className=" flex justify-between h-16 items-center">
          <Link to="/" className="font-mono text-xl font-bold">
            blog<span className="text-green-500">.app</span>
          </Link>

          {/** Desktop links */}
          <div className="items-center space-x-8 hidden md:flex">
            <Link
              to={"/"}
              className={`${
                location.pathname === "/" ? "text-muted-foreground " : ""
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
              <UserAccountIcon signOut={signOut} user={user} />
            ) : (
              <Button variant="outline" onClick={signInWithGitHub}>
                <LogIn />
                Entrar
              </Button>
            )}
          </div>

          {/** Mobile menu button */}
          <div className="md:hidden md:gap-8 gap-4 flex">
            <ToggleTheme />
            {user ? (
              <UserAccountIcon signOut={signOut} user={user} />
            ) : (
              <Button variant="outline" onClick={signInWithGitHub}>
                <LogIn />
                Entrar
              </Button>
            )}
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
            <Link
              to={"/"}
              className="block px-3 py-2 rounded-md text-base"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to={"/create"}
              className="block px-3 py-2 rounded-md text-base"
              onClick={() => setMenuOpen(false)}
            >
              Criar Post
            </Link>
            <Link
              to={"/communities"}
              className="block px-3 py-2 rounded-md text-base "
              onClick={() => setMenuOpen(false)}
            >
              Comunidades
            </Link>
            <Link
              to={"/community/create"}
              className="block px-3 py-2 rounded-md text-base"
              onClick={() => setMenuOpen(false)}
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

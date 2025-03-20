import { useState } from "react";
import { Link } from "react-router";
import ToggleTheme from "./toggle-theme";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-40  border-b">
      <div className="max-w-5xl mx-auto px-4">
        <div className=" flex justify-between h-16 items-center">
          <div>
            <Link to="/" className="font-mono text-xl font-bold">
              blog<span className="text-purple-500">.app</span>
            </Link>
          </div>
          {/** Desktop links */}
          <div className="items-center space-x-8 hidden md:flex">
            <Link to={"/"} className="">
              Home
            </Link>
            <Link to={"/create"}>Criar Post</Link>
            <Link to={"/communities"}>Comunidades</Link>
            <Link to={"/community/create"}>Criar Comunidades</Link>
            <ToggleTheme />
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
            <Link
              to={"/"}
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to={"/create"}
              className="block px-3 py-2 rounded-md text-base font-medium"
            >
              Criar Post
            </Link>
            <Link
              to={"/communities"}
              className="block px-3 py-2 rounded-md text-base font-medium "
            >
              Comunidades
            </Link>
            <Link
              to={"/community/create"}
              className="block px-3 py-2 rounded-md text-base font-medium "
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

import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/register", label: "Register" },
    { to: "/login", label: "Login" },
    { to: "/create-category", label: "Create Category" },
    { to: "/see-category", label: "All Categories" },
    { to: "/see-one-category", label: "One Category" },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <nav className="container mx-auto flex justify-between items-center h-[80px] px-4 md:px-8">
        <div className="text-2xl font-bold text-indigo-500">
          <NavLink to="/">MyApp</NavLink>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-semibold ${
                  isActive
                    ? "text-indigo-500 border-b-2 border-indigo-500"
                    : "text-gray-700 hover:text-indigo-500"
                } transition`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-[80px] left-0 w-full bg-white shadow-lg md:hidden">
            <nav className="flex flex-col items-center gap-4 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `text-lg font-semibold ${
                      isActive
                        ? "text-indigo-500 border-b-2 border-indigo-500"
                        : "text-gray-700 hover:text-indigo-500"
                    } transition`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

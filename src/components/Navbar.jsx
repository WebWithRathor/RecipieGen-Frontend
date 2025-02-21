import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white/[.3] z-[999] backdrop-blur-md p-4 px-10 uppercase flex justify-between items-center">
      <Link to="/">
        <h1 className="text-red-950 font-bold italic flex gap-1 tracking-widest rounded-full px-2">
          <img
            className="h-6"
            draggable={false}
            src="https://cdn-icons-png.flaticon.com/512/3565/3565407.png"
            alt="Logo"
          />
          RecipeStar
        </h1>
      </Link>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-red-950 text-sm duration-75 cursor-pointer md:hidden"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-white/[.9] backdrop-blur-md flex flex-col items-center justify-center transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
      >
        <button
          onClick={() => setIsMenuOpen(false)}
          className="absolute top-4 right-4 text-red-950 text-sm duration-75 cursor-pointer"
        >
          ✖
        </button>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer mb-4">
            Home
          </h5>
        </NavLink>
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer mb-4">
            Recipes
          </h5>
        </NavLink>
        <NavLink
          to="/donation-centers"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer mb-4">
            Find Donation Centers
          </h5>
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
          onClick={() => setIsMenuOpen(false)}
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer mb-4">
            Start Meal Planning
          </h5>
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-10">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">
            Home
          </h5>
        </NavLink>
        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">
            Recipes
          </h5>
        </NavLink>
        <NavLink
          to="/donation-centers"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">
            Find Donation Centers
          </h5>
        </NavLink>
        <NavLink
          to="/create"
          className={({ isActive }) =>
            isActive ? "text-red-800" : "text-red-950"
          }
        >
          <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">
            Start Meal Planning
          </h5>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;

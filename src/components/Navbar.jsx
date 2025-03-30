import React, { useState } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/userAction";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  // Hide navbar details (except logo) on / and /login
  const hideDetails = ["/", "/login"].includes(location.pathname);

  return (
    <div className="fixed w-full bg-white/[.3] z-[999] backdrop-blur-md p-4 px-10 uppercase flex justify-between items-center">
      
      {/* Logo - Always Visible */}
      <Link to="/home">
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

      {/* Hide Everything Else on / and /login */}
      {!hideDetails && (
        <>
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
            <NavLink to="/home" className={({ isActive }) => isActive ? "text-red-800" : "text-red-950"} onClick={() => setIsMenuOpen(false)}>
              <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer mb-4">Home</h5>
            </NavLink>
            <NavLink to="/recipes" className={({ isActive }) => isActive ? "text-red-800" : "text-red-950"} onClick={() => setIsMenuOpen(false)}>
              <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer mb-4">Recipes</h5>
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => isActive ? "text-red-800" : "text-red-950"} onClick={() => setIsMenuOpen(false)}>
              <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer mb-4">Start Meal Planning</h5>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/home" className={({ isActive }) => isActive ? "text-red-800" : "text-red-950"}>
              <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">Home</h5>
            </NavLink>
            <NavLink to="/recipes" className={({ isActive }) => isActive ? "text-red-800" : "text-red-950"}>
              <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">Recipes</h5>
            </NavLink>
            <NavLink to="/create" className={({ isActive }) => isActive ? "text-red-800" : "text-red-950"}>
              <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">Start Meal Planning</h5>
            </NavLink>
            <NavLink to="/savedRecipie" className={({ isActive }) => isActive ? "text-red-800" : "text-red-950"}>
              <h5 className="hover:text-red-900 text-sm duration-75 cursor-pointer">Saved Recipies</h5>
            </NavLink>
            <button onClick={handleLogout} className="text-sm px-3 py-2 cursor-pointer font-medium rounded-lg transition-all duration-200 flex items-center gap-2 justify-center bg-red-950 text-white hover:bg-red-900 focus:ring-4 focus:ring-red-500 focus:ring-opacity-50">
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;

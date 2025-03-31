import React from "react";
import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

const App = () => {
  const path = useLocation().pathname;

  return (
    <>
      <div className="h-screen w-full fixed top-0  left-0 z-[-1]">
        <img
          className=" w-full h-full object-cover "
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
      { <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;

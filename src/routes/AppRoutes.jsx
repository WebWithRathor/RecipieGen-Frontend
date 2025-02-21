import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Create from "../components/Create";
import Recipe from "../components/Recipe";
import RecipePicker from "../components/RecipePicker";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/create" element={<Create />} />
        <Route path="/pickAny" element={<RecipePicker />} />
        <Route path="/recipe/:dishname" element={<Recipe />} />
      </Routes>
  );
};

export default AppRoutes;

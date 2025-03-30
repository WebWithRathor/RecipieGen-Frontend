import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Create from "../components/Create";
import Recipe from "../components/Recipe";
import RecipePicker from "../components/RecipePicker";
import Auth from "../components/Auth";
import ProtectedRoute from "../components/partials/ProtectedRoute";
import SavedRecipie from "../components/SavedRecipie";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/login" element={<Auth isLoginPage={true} title={"Welcome Back"} />} />
      <Route path="/" element={<Auth isLoginPage={false} title={"Create your account"} />} />
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path="/recipes" element={<ProtectedRoute><Recipes /></ProtectedRoute>} />
      <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
      <Route path="/pickAny" element={<ProtectedRoute><RecipePicker /></ProtectedRoute>} />
      <Route path="/recipe/:dishname" element={<ProtectedRoute><Recipe /></ProtectedRoute>} />
      <Route path="/savedRecipie" element={<ProtectedRoute><SavedRecipie /></ProtectedRoute>} />
      {/* <Route path="/donation-centers" element={<ProtectedRoute><Recipe /></ProtectedRoute>} /> */}
    </Routes>
  );
};

export default AppRoutes;

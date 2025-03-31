import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchRecipeSuggestions } from "../store/actions/RecipeAction";
import SingleRecipieCard from "./partials/SingleRecipieCard";

const RecipePicker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { description, ingredients, preference } = location.state;
  const { suggestedRecipes, loading } = useSelector(state => state.RecipeReducer);

  useEffect(() => {
    if (description && ingredients) {
      dispatch(fetchRecipeSuggestions({ description, ingredients, preference },navigate));
    }
  }, [description, ingredients, dispatch]);


  return (
    <div className="h-screen w-full flex flex-col items-center justify-start bg-white/[0.2] pt-20 overflow-auto  p-8">
      {/* 🔹 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-18 left-10 flex items-center gap-2 bg-red-800 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-red-700 transition-all duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7m0 0l7-7m-7 7h14"
          />
        </svg>
        <span className="font-medium">Back</span>
      </button>

      {/* 🔹 Page Title */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">🍽️ Pick Any One</h1>

      {/* 🔹 Recipe Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 rounded-md"></div>
              <div className="mt-4 h-5 w-3/4 bg-gray-300 rounded"></div>
              <div className="mt-2 h-4 w-1/2 bg-gray-300 rounded"></div>
              <div className="mt-2 h-4 w-1/3 bg-gray-300 rounded"></div>
            </div>
          ))
          : suggestedRecipes.map((recipe, i) => <SingleRecipieCard recipe={recipe} key={i} />)}
      </div>
    </div>
  );
};

export default RecipePicker;

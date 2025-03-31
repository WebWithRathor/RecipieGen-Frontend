import React, { useEffect, useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../store/actions/RecipeAction";
import Inp from "./Inp";

const Recipes = () => {
  const { recipes } = useSelector((state) => state.RecipeReducer);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchAllRecipes()).finally(() => setLoading(false));
  }, [dispatch]);

  const displayedRecipes = searchTerm
    ? recipes?.filter((recipe) =>
        recipe?.dishName?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : recipes;

  return (
    <div className="w-full min-h-screen pt-20 pb-10 px-6 lg:px-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 text-center">
        Our Recipes
      </h1>
      
      <div className="relative max-w-md mx-auto mb-8">
        <Inp
          type="text"
          placeholder="Search Recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={
            <svg
              className="w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M15 10a5 5 0 11-10 0 5 5 0 0110 0z"
              />
            </svg>
          }
        />
      </div>
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center place-items-center">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="bg-white w-full p-4 rounded-lg shadow-md animate-pulse">
              <div className="h-48 bg-gray-300 rounded-md"></div>
              <div className="mt-4 h-5 bg-gray-300 rounded"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center place-items-center">
          {displayedRecipes?.length > 0 ? (
            displayedRecipes.map((card, i) => <Card key={i} recipe={card} />)
          ) : (
            <h1 className="text-2xl md:text-3xl font-bold text-gray-400 text-center col-span-5">
              No Recipe Found
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
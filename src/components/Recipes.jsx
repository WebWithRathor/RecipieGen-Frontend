import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../store/actions/RecipeAction";

const Recipes = () => {
  const { recipes } = useSelector((state) => state.RecipeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!recipes) dispatch(fetchAllRecipes());
  }, [recipes]);

  return (
    <div className="w-full min-h-screen pt-20 pb-10 px-6 lg:px-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center">
        Our Recipes
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center place-items-center">
        {recipes == null ? <h1 className="text-2xl md:text-3xl font-bold text-gray-400 text-center col-span-5">No Recipie</h1> : recipes.length > 0 ? (
          recipes.map((card, i) => <Card key={i} recipe={card} />)
        ) : (
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-white w-full p-4 rounded-lg shadow-md animate-pulse"
            >
              <div className=" h-48 bg-gray-300 rounded-md"></div>
              <div className="mt-4 h-5  bg-gray-300 rounded"></div>
              <div className="mt-2 h-4  bg-gray-300 rounded"></div>
              <div className="mt-2 h-4  bg-gray-300 rounded"></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recipes;

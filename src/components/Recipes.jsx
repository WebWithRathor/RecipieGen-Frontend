import React, { useEffect } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRecipes } from "../store/actions/RecipeAction";

const Recipes = () => {
  const { recipes } = useSelector((state) => state.RecipeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (recipes.length === 0) dispatch(fetchAllRecipes());
  }, [recipes]);

  return (
    <div className="w-full min-h-screen pt-20 pb-10 px-6 lg:px-20">
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center">
        Our Recipes
      </h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center">
        {recipes.length > 0 ? (
          recipes.map((card, i) => <Card key={i} recipe={card} />)
        ) : (
          <p className="text-gray-600 text-lg col-span-full text-center">
            No recipes found. Please check back later.
          </p>
        )}
      </div>
    </div>
  );
};

export default Recipes;

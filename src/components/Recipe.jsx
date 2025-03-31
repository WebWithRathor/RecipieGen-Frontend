import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetails } from "../store/actions/RecipeAction";
import { saveRecipeAction, removeRecipeAction } from "../store/actions/userAction";

const Recipe = () => {
  const { dishname } = useParams();
  const dispatch = useDispatch();

  const { recipe, loading } = useSelector((state) => state.RecipeReducer);
  const { user } = useSelector((state) => state.UserReducer);

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (dishname) {
      dispatch(fetchRecipeDetails(dishname));
    }
  }, [dishname, dispatch]);

  useEffect(() => {
    // Update isSaved when user state updates
    setIsSaved(user?.savedDishes?.some(dish => dish._id === recipe?._id));
  }, [user, recipe]);

  const handleToggleSaveRecipe = async (id) => {
    if (isSaved) {
      await dispatch(removeRecipeAction(id));
    } else {
      await dispatch(saveRecipeAction(id));
    }
    setIsSaved(!isSaved); // Toggle local state for instant UI update
  };


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="h-16 w-16 border-4 border-gray-300 border-t-4 border-t-red-500 rounded-full animate-spin"></div>
        <p className="text-lg font-medium text-gray-700 mt-4">Fetching recipe details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-16 pb-10 px-6">
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden p-8">
        {/* Recipe Image */}
        <div className="rounded-xl overflow-hidden mb-6 shadow-md">
          <img
            className="w-full h-72 object-cover"
            src={recipe?.dishImageUrl}
            alt={recipe?.dishName}
          />
        </div>

        {/* Recipe Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          {recipe?.dishName}
        </h1>

        {/* Brief Description */}
        <p className="text-lg text-gray-700 mb-6">{recipe?.briefDescription}</p>

        {/* Ingredients Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {recipe?.ingredients?.map((ingre, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-gray-100 rounded-lg text-gray-800 text-sm shadow-sm"
              >
                {ingre.item} - {ingre.quantity} {ingre.notes && `(${ingre.notes})`}
              </span>
            ))}
          </div>
        </section>

        {/* Cooking Instructions */}
        <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Steps</h2>
          <ol className="space-y-4">
            {recipe?.cookingInstructions?.map((step, i) => {
              let heading, desc;
              if (step.includes("**")) {
                heading = step.split("**")[1].substring(0, step.split("**")[1].length - 1);
                desc = step.split("**")[2];
              } else {
                heading = "";
                desc = step;
              }
              return (
                <li
                  key={i}
                  className="p-4 bg-white rounded-lg shadow-md border-l-4 border-red-500"
                >
                  <span className="font-semibold text-red-700 mr-2">
                    Step {i + 1}:
                  </span>
                  {heading && <span className="font-bold text-gray-700">{heading}</span>}
                  <span className="text-gray-700">{desc}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Floating Save/Remove Button */}
        <button
          onClick={() => handleToggleSaveRecipe(recipe._id)}
          className={`fixed bottom-8 right-8 px-4 py-3 font-semibold rounded shadow-lg transition duration-300 ${isSaved ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-red-950 text-white hover:bg-red-900"
            }`}
        >
          {isSaved ? "❌ Remove Recipe" : "❤️ Save Recipe"}
        </button>

      </div>
    </div>
  );
};

export default Recipe;

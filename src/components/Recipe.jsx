import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipeDetails } from "../store/actions/RecipeAction";
import { saveRecipeAction, removeRecipeAction } from "../store/actions/userAction";
import { Clock, ChefHat, Hourglass } from "lucide-react";

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
    setIsSaved(user?.savedDishes?.some(dish => dish?._id === recipe?._id));
  }, [user?.savedDishes, recipe?._id]);

  const handleToggleSaveRecipe = useCallback(async (id) => {
    if (isSaved) {
      await dispatch(removeRecipeAction(id));
    } else {
      await dispatch(saveRecipeAction(id));
    }
    setIsSaved(!isSaved); 
  }, [dispatch, isSaved]);

  const ingredientsList = useMemo(() => {
    return recipe?.ingredients?.map((ingre, i) => (
      <span
        key={i}
        className="inline-block px-3 py-1 bg-gray-100 rounded-full text-gray-800 text-sm shadow-sm mr-2 mb-2"
      >
        {ingre.item} - {ingre.quantity} {ingre.notes && `(${ingre.notes})`}
      </span>
    ));
  }, [recipe?.ingredients]);

  const cookingSteps = useMemo(() => {
    return recipe?.cookingInstructions?.map((step, i) => {
      const parts = step.split("**");
      const heading = parts.length > 1 ? parts[1]?.slice(0, -1) : "";
      const desc = parts.length > 2 ? parts[2] : step;

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
    });
  }, [recipe?.cookingInstructions]);

  const timeAndDifficulty = useMemo(() => {
    const { cookingTime, difficultyLevel, preparationTime } = recipe?.cookingTimeAndDifficulty || {};

    return (
      <div className="flex justify-center items-center gap-6 my-4">
        {preparationTime && (
          <div className="flex items-center bg-gray-100 shadow-sm px-4 py-2 rounded-lg">
            <Hourglass className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-gray-700 font-medium">Prep: {preparationTime}</span>
          </div>
        )}
        {cookingTime && (
          <div className="flex items-center bg-gray-100 shadow-sm px-4 py-2 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Cook: {cookingTime}</span>
          </div>
        )}
        {difficultyLevel && (
          <div className="flex items-center bg-gray-100 shadow-sm px-4 py-2 rounded-lg">
            <ChefHat className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-gray-700 font-medium">Difficulty: {difficultyLevel}</span>
          </div>
        )}
      </div>
    );
  }, [recipe?.cookingTimeAndDifficulty]);

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
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          {recipe?.dishName}
        </h1>

        {/* Time and Difficulty - Direct Horizontal Alignment */}
        <div className="flex justify-center mb-6">
          {timeAndDifficulty}
        </div>

        {/* Brief Description */}
        <p className="text-lg text-gray-700 mb-6 text-center italic text-gray-600">{recipe?.briefDescription}</p>

        {/* Ingredients Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-red-700 mb-4">Ingredients</h2>
          <div className="flex flex-wrap gap-2">
            {ingredientsList}
          </div>
        </section>

        <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md mt-6">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Steps</h2>
          <ol className="space-y-4">
            {cookingSteps}
          </ol>
        </div>

        {recipe?.servingSuggestions && (
          <div className="w-full bg-gray-100 p-6 rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold text-red-800 mb-4 flex items-center">
              🍽️ Serving Suggestions
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {recipe.servingSuggestions}
            </p>
          </div>
        )}

        <button
          onClick={() => handleToggleSaveRecipe(recipe?._id)}
          className={`fixed bottom-8 right-8 px-5 py-3 font-semibold rounded-full shadow-lg transition duration-300 ${isSaved ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-red-950 text-white hover:bg-red-900"
            }`}
          disabled={!recipe?._id}
        >
          {isSaved ? "❌ Remove" : "❤️ Save"}
        </button>

      </div>
    </div>
  );
};

export default Recipe;
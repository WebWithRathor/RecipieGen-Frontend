import React from "react";
import { Link } from "react-router-dom";

const Card = ({ recipe }) => {
  return (
    <div className="shadow-md w-60 h-80 flex flex-col items-center bg-zinc-200/[0.8] backdrop-blur-[5px] rounded-lg p-4 transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="w-32 h-32 bg-zinc-300 rounded-full overflow-hidden flex items-center justify-center">
        <img
          src={recipe.dishImageUrl || "/placeholder.jpg"} // Fallback image
          alt={recipe.dishName || "Recipe"}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Recipe Name */}
      <h1 className="font-bold text-lg mt-3 text-center text-gray-800 truncate w-full px-2">
        {recipe.dishName || "Some Recipe"}
      </h1>

      {/* Description */}
      <p className="text-sm text-gray-600 mt-1 text-center px-2 line-clamp-2">
        {recipe.briefDescription
          ? recipe.briefDescription.substring(0, 70) + "..."
          : "No description available."}
      </p>

      {/* Action Button */}
      <div className="w-full mt-auto pt-3">
        <Link
          to={`/recipe/${recipe.dishName}`}
          className="block w-full bg-red-950 text-white py-2 text-center rounded-full hover:bg-red-800 transition-all"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default Card;

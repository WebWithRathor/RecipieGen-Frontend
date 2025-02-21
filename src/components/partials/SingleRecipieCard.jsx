import React from "react";
import { Link } from "react-router-dom";

const SingleRecipieCard = ({ recipe }) => {
  return (
    <Link to={`/recipe/${recipe.dishName}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition hover:scale-105 cursor-pointer">
        <img
          src={recipe["Dish Image URL"]}
          alt={recipe["Dish Name"]}
          className="w-full h-32 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800">{recipe.dishName}</h3>
          <p className="text-gray-600 text-sm">
            {recipe.briefDescription.substring(0, 100) + "..."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SingleRecipieCard;

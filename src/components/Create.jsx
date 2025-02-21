import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!description.trim() && ingredients.length === 0) {
      setError("Please enter a description or add at least one ingredient.");
      return;
    }
    setLoading(true);
    try {
      if (ingredients.length === 0) {
        setError("Please add at least one ingredient");
        return;
      }
      navigate("/pickAny", { state: { description, ingredients } });
    } catch (error) {
      setError("Failed to generate recipe.");
    } finally {
      setLoading(false);
    }
  };

  const addIngredientHandler = () => {
    if (ingredientInput.trim() && !ingredients.includes(ingredientInput)) {
      setIngredients([...ingredients, ingredientInput]);
      setIngredientInput("");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4">
      <div className="w-full max-w-md border mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Generate Recipe
        </h2>

        {error && <p className="text-red-600 mb-2 text-center">{error}</p>}

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 focus:border-red-800 focus:ring-red-800 sm:text-sm py-2 px-3"
              placeholder="Enter description about the leftover"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ingredients
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0">
              <input
                type="text"
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                className="flex-1 block w-full rounded-md border border-gray-300 focus:border-red-800 focus:ring-red-800 sm:text-sm py-2 px-3"
                placeholder="Enter an ingredient"
              />
              <button
                type="button"
                onClick={addIngredientHandler}
                className="px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-700 transition"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 text-sm text-gray-700">
              {ingredients.map((ing, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <span>- {ing}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-red-950 text-white font-medium py-2 px-4 rounded-md shadow hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-offset-2 transition"
            >
              {loading ? "Generating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;

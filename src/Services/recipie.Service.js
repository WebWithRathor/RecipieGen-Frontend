import axios from "../utils/axios";

export const getRecipeSuggestions = async ({ ingredients, description }) => {
  try {
    if (!ingredients?.length && !description) {
      throw new Error("Please provide ingredients or a description.");
    }
    const response = await axios.post("/recipe/suggestRecipes", {
      ingredients,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error in getRecipeSuggestions service:", error.message);
    throw error;
  }
};

export const getAllRecipes = async () => {
  try {
    const response = await axios.get("/recipe/all");
    return response.data;
  } catch (error) {
    console.error("Error in getAllRecipes service:", error.message);
    throw error;
  }
};

export const getRecipeDetails = async (dishName) => {
  try {
    if (!dishName) {
      throw new Error("Please provide a dish name.");
    }
    const response = await axios.post("/recipe/getRecipeDetails", { dishName });
    return response.data;
  } catch (error) {
    console.error("Error in getRecipeDetails service:", error.message);
    throw error;
  }
};

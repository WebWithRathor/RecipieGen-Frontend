import {
  setRecipes,
  setRecipe,
  setSuggestedRecipes,
  setLoading

} from "../reducers/ReciepeSlice";
import {
  getAllRecipes,
  getRecipeDetails,
  getRecipeSuggestions,
} from "../../Services/recipie.Service.js";

export const fetchAllRecipes = () => async (dispatch) => {
  try {
    const data = await getAllRecipes();
    dispatch(setRecipes(data.recipes));
  } catch (error) {
    console.error("Error in fetchAllRecipes action:", error.message);
  }
};

export const fetchRecipeDetails = (dishName) => async (dispatch) => {
  try {
    dispatch(setLoading(true)); // Set loading state before fetching

    const cachedRecipe = localStorage.getItem(dishName);
    if (cachedRecipe) {
      dispatch(setRecipe(JSON.parse(cachedRecipe)));
    } else {
      const { recipe } = await getRecipeDetails(dishName);
      dispatch(setRecipe(recipe));
      localStorage.setItem(dishName, JSON.stringify(recipe));
    }
  } catch (error) {
    console.error("Error in fetchRecipeDetails action:", error.message);
  } finally {
    dispatch(setLoading(false)); // Ensure loading is set to false after fetching
  }
};


export const fetchRecipeSuggestions = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { description, ingredients } = payload;
    const key = `${description}-${ingredients.join(",")}`;
    const cachedRecipes = localStorage.getItem(key);
    if (cachedRecipes) {
      dispatch(setSuggestedRecipes(JSON.parse(cachedRecipes)));
    } else {
      const { suggestions } = await getRecipeSuggestions(payload);
      dispatch(setSuggestedRecipes(suggestions));
      localStorage.setItem(key, JSON.stringify(suggestions));
    }
  } catch (error) {
    console.error("Error in fetchRecipeSuggestions action:", error.message);
  } finally {
    dispatch(setLoading(false)); // Ensure loading is set to false after fetching
  }
};

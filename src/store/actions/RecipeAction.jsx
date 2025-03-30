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
    dispatch(setLoading(true));
    const { recipe } = await getRecipeDetails(dishName);
    dispatch(setRecipe(recipe));
  } catch (error) {
    console.error("Error in fetchRecipeDetails action:", error.message);
  } finally {
    dispatch(setLoading(false)); // Ensure loading is set to false after fetching
  }
};


export const fetchRecipeSuggestions = (payload) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { suggestions } = await getRecipeSuggestions(payload);
    console.log(suggestions);
    dispatch(setSuggestedRecipes(suggestions));
  } catch (error) {
    console.error("Error in fetchRecipeSuggestions action:", error.message);
  } finally {
    dispatch(setLoading(false)); // Ensure loading is set to false after fetching
  }
};



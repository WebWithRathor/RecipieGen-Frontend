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
import { toast } from "sonner";

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
    toast.error(error.message);
  } finally {
    dispatch(setLoading(false));
  }
};


export const fetchRecipeSuggestions = (payload, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { suggestions } = await getRecipeSuggestions(payload);
    if (suggestions.length == 0) {
      navigate('/create');
      toast.warning("Provide proper ingredients & description.");
    }
    dispatch(setSuggestedRecipes(suggestions));
  } catch (error) {
    console.error("Error in fetchRecipeSuggestions action:", error.message);
  } finally {
    dispatch(setLoading(false));
  }
};



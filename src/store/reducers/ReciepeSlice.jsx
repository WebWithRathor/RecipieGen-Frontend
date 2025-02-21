import { createSlice } from "@reduxjs/toolkit";

const RecipeSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    suggestedRecipes: [],
    recipe:null,
    loading: false,
  },
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setRecipe: (state, action) => {
      state.recipe = action.payload;
    },
    setSuggestedRecipes: (state, action) => {
      state.suggestedRecipes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});


export default RecipeSlice.reducer;
export const { setRecipes,setLoading , setRecipe , setSuggestedRecipes} = RecipeSlice.actions;
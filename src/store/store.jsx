import { configureStore } from '@reduxjs/toolkit'
import  RecipeSlice from './reducers/ReciepeSlice'

export const store = configureStore({
  reducer: {
    RecipeReducer : RecipeSlice
  },
})
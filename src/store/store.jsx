import { configureStore } from '@reduxjs/toolkit'
import RecipeSlice from './reducers/ReciepeSlice'
import userSlice  from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    RecipeReducer: RecipeSlice,
    UserReducer: userSlice
  },
})
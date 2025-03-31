import { toast } from "sonner";
import { removeRecipe, saveRecipe } from "../../Services/recipie.Service";
import {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../../Services/user.service";

import { setUser } from "../reducers/userSlice";

const handleAsync = (asyncFn) => async (dispatch, getState) => {
    try {
        const result = await asyncFn(dispatch, getState);
        return result;
    } catch (error) {
        console.log(error?.response?.data?.message);
        return null;
    }
};

export const fetchUser = () => handleAsync(async (dispatch) => {
    const { user } = await getUser();
    if (!user) {
        return null;
    }
    dispatch(setUser(user));
    return user;
});

export const logout = (navigate) => handleAsync(async (dispatch) => {
    await logoutUser();
    dispatch(setUser(null));
    navigate("/");
    toast.success('Successfully logged out!');
    return true;
});

export const signup = (userData, navigate) => handleAsync(async (dispatch) => {
    const { data } = await registerUser(userData);
    dispatch(setUser(data));
    navigate("/home");
    toast.success('Successfully signed up!');
    return data;
});

export const login = (userData, navigate) => handleAsync(async (dispatch) => {
    const data = await loginUser(userData);
    if (!data) throw Error("Invalid Credentials");
    dispatch(setUser(data.data));
    navigate("/home");
    toast.success('Successfully logged in!');
    return data;
});

export const saveRecipeAction = (recipeId) => handleAsync(async (dispatch, getState) => {
    const { user } = getState().UserReducer;
    if (!user) return null;
    const data = await saveRecipe(recipeId);
    dispatch(setUser({ ...user, savedDishes: data.savedDishes }));
    toast.success('Successfully Saved!');
    return data;
});

export const removeRecipeAction = (recipeId) => handleAsync(async (dispatch, getState) => {
    const { user } = getState().UserReducer;
    if (!user) return null;
    const data = await removeRecipe(recipeId);
    toast.success('Successfully removed!');
    dispatch(setUser({ ...user, savedDishes: data.savedDishes }));
    return data;
});


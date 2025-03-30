import { removeRecipe, saveRecipe } from "../../Services/recipie.Service";
import {
    getUser,
    loginUser,
    logoutUser,
    registerUser,
} from "../../Services/user.service"; // Ensure these functions exist in the correct path

import { setUser } from "../reducers/userSlice";

const handleAsync = (asyncFn) => async (dispatch, getState) => {
    try {
        const result = await asyncFn(dispatch, getState);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
};


export const updateUserAction = (userId, userData) => handleAsync(async (dispatch, getState) => {
    const { users } = getState().userreducer;
    const existingUser = users.find(user => user.id === userId);
    if (!existingUser) {
        return null;
    }

    let updatedFields = { ...userData };
    if (userData.name) {
        const [first_name, ...lastNameParts] = userData.name.trim().split(" ");
        updatedFields.first_name = first_name;
        updatedFields.last_name = lastNameParts.join(" ") || existingUser.last_name;
        delete updatedFields.name;
    }

    const updatedUser = await updateUser(userId, { ...existingUser, ...updatedFields });
    if (!updatedUser) {
        return null;
    }

    dispatch(setUser(updatedUser));
    return updatedUser;
});



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
    return true;
});

export const signup = (userData, navigate) => handleAsync(async (dispatch) => {
    const { data } = await registerUser(userData);
    dispatch(setUser(data));
    navigate("/home");
    return data;
});

export const login = (userData, navigate) => handleAsync(async (dispatch) => {
    const data = await loginUser(userData);
    if (!data) throw Error("Invalid Credentials");
    dispatch(setUser(data.data));
    navigate("/home");
    return data;
});

export const saveRecipeAction = (recipeId) => handleAsync(async (dispatch, getState) => {
    const { user } = getState().UserReducer;
    if (!user) return null;

    const data = await saveRecipe(recipeId);
    console.log(data);
    
    dispatch(setUser({ ...user, savedDishes: data.savedDishes }));
    return data;
});

export const removeRecipeAction = (recipeId) => handleAsync(async (dispatch, getState) => {
    const { user } = getState().UserReducer;
    if (!user) return null;
    console.log(recipeId);
    
    const data = await removeRecipe(recipeId);
    dispatch(setUser({ ...user, savedDishes: data.savedDishes }));
    return data;
});


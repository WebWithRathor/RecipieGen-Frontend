import Axios from "../utils/axios";

const handleRequest = async (method, url, body = null) => {
        const {data}  = await Axios[method](url, body);
        return data;
};
export const logoutUser = () => handleRequest("get", "/auth/logout");

export const googleLoginUser = (user) => handleRequest("get", "/auth/google", user);

export const registerUser = (user) => handleRequest("post", "/auth/register", user);

export const loginUser = (user) => handleRequest("post", "/auth/login", user);

export const getUser = () => handleRequest("get", `/auth/profile`);

export const saveRecipie = () => handleRequest("get", `/auth/profile`);

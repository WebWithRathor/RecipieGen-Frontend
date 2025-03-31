import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../store/actions/userAction";
import Btn from "./Btn";
import Inp from "./Inp";

const Auth = ({ title, isLoginPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            const userData = { email, password, ...(isLoginPage ? {} : { name }) };
            dispatch(isLoginPage ? login(userData, navigate) : signup(userData, navigate));
        },
        [email, password, name, isLoginPage, navigate, dispatch]
    );

    return (
        <div className="min-h-screen poppins-regular flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-lg px-10 py-8 w-full sm:max-w-md max-w-xs">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    {title}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {!isLoginPage && (
                        <Inp
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            label="Name"
                        />
                    )}
                    <Inp
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        label="Email Address"
                    />
                    <Inp
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        label="Password"
                    />
                    <Btn type="submit" variant="primary" fullWidth>
                        {isLoginPage ? "Login" : "Sign up"}
                    </Btn>
                </form>
                <p className="text-sm text-gray-500 text-center mt-5">
                    {isLoginPage ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Link
                        to={isLoginPage ? "/" : "/login"}
                        className="text-red-600 font-medium hover:underline"
                    >
                        {isLoginPage ? "Sign up here" : "Login"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Auth;
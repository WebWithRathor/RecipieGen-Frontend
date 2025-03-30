import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, signup } from "../store/actions/userAction";
import Btn from "./Btn";
import Inp from "./Inp";

// Component for handling both login and signup functionality
const Auth = ({ title, isLoginPage }) => {
    // Form state management
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = { email, password };
        if (!isLoginPage) userData = { name, ...userData }
        dispatch(!isLoginPage ? signup(userData, navigate) : login(userData, navigate));
    };

    return (
        <div className="min-h-screen poppins-regular flex items-center justify-center">
            <div className="bg-white shadow-xl rounded-lg px-10 py-8 w-full sm:max-w-md max-w-xs">
                {/* Auth form title */}
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                    {title}
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Email input */}
                    {!isLoginPage && <Inp
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        label="Name"
                    />}
                    <Inp
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        label="Email Address"
                    />

                    {/* Password input */}
                    <Inp
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        label="Password"
                    />

                    {/* Submit Button */}
                    <Btn type="submit" variant="primary" fullWidth>
                        {isLoginPage ? "Login" : "Sign up"}
                    </Btn>
                </form>

                {/* Toggle between login and signup */}
                <p className="text-sm text-gray-500 text-center mt-5">
                    {isLoginPage ? "Don't have an account?" : "Already have an account?"}{" "}
                    <Link to={isLoginPage ? "/" : "/login"} className="text-red-600 font-medium hover:underline">
                        {isLoginPage ? "Sign up here" : "Login"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Auth;

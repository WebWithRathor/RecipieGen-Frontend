import React, { memo } from "react";
import { Link } from "react-router-dom";

const Home = memo(() => {
    return (
        <div className="w-full text-red-950 h-screen p-5 bg-white/[0.2] lg:bg-transparent md:p-10 flex items-center justify-end relative z-0">
            <div className="md:pr-10">
                <h1 className="md:font-normal font-semibold text-3xl md:text-6xl mb-1.5 ">Zero Waste </h1>
                <h1 className="md:font-normal font-semibold text-3xl md:text-6xl mb-1.5 "> Recipe Generator – </h1>
                <h1 className="md:font-normal font-semibold text-3xl md:text-6xl mb-1.5 ">Cook Smart, Waste Less!</h1>
                <p className="md:w-[87vh] md:font-normal md:bg-transparent bg-white p-3 md:p-0 rounded mt-4">
                    Transform leftovers into delicious meals with our Zero Waste Recipe
                    Generator! Simply enter the ingredients you have, and we’ll suggest
                    creative, sustainable recipes to minimize food waste. Eat well, save
                    money, and help the planet—one meal at a time! 🌱🍽️
                </p>
                <Link to={"/create"}>
                    <button className="text-xs text-white px-8 py-3 rounded-full mt-4 uppercase font-bold tracking-wider bg-red-950 hover:bg-red-900 duration-75">
                        Generate recipe
                    </button>
                </Link>
            </div>
        </div>
    );
});

Home.displayName = 'Home';

export default Home;
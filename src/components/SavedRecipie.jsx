import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";

const SavedRecipes = () => {
    const {user} = useSelector((state) => state.UserReducer);
    const { savedDishes } = user;
    const [loading, setloading] = useState(true);
    useEffect(()=>{
        setTimeout(() => {
            setloading(false);
        }, 1000);
    },[])

    return (
        <div className="w-full min-h-screen pt-20 pb-10 px-6 lg:px-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-12 text-center">
                Saved Recipes
            </h1>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center place-items-center">
                {loading ? (
                    // Skeleton Loaders when data is loading
                    Array.from({ length: 5 }).map((_, index) => (
                        <div key={index} className="bg-white w-full p-4 rounded-lg shadow-md animate-pulse">
                            <div className="h-48 bg-gray-300 rounded-md"></div>
                            <div className="mt-4 h-5 bg-gray-300 rounded"></div>
                            <div className="mt-2 h-4 bg-gray-300 rounded"></div>
                            <div className="mt-2 h-4 bg-gray-300 rounded"></div>
                        </div>
                    ))
                ) : savedDishes && savedDishes.length > 0 ? (
                    // Show saved recipes if available
                    savedDishes.map((recipe, i) => <Card key={i} recipe={recipe} />)
                ) : (
                    // Show message if no saved recipes found
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-400 text-center col-span-5">
                        No Saved Recipes
                    </h1>
                )}
            </div>
        </div>
    );
};

export default SavedRecipes;

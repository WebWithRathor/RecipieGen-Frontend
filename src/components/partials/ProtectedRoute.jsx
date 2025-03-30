import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/actions/userAction";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.UserReducer);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            dispatch(fetchUser()).finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [dispatch, user]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
    children: React.JSX.Element,
}

const ProtectedRoute = ({ children } : Props) => {
    const token = localStorage.getItem("token");
    const isGuest = localStorage.getItem("isGuest") === "true";

    if(!token && !isGuest) {
        return <Navigate to="/login"/>
    }

    return children
}

export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";

export type PrivateRouteProps = {
    children: JSX.Element;
    loggedIn: boolean;
};

const PrivateRoute = (props: PrivateRouteProps) => {
    return props.loggedIn ? props.children : <Navigate to="/login" />;
};

export default PrivateRoute;

import { Outlet, Navigate } from "react-router-dom";
const PrivateRoute = () => {
    const currentUser = true
    return (
        <>
            { currentUser ? <Outlet /> : <Navigate to="/login" />}
        </>
    );
};

export default PrivateRoute;
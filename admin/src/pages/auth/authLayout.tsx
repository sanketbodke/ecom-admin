import { Outlet, Navigate } from "react-router-dom";
const AuthLayout = () => {
    const isAuthenticated = false;
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ): (
                <div className="authContainer">
                    <section className="authComponentContainer">
                        <Outlet />
                    </section>
                </div>
            )}
        </>
    );
};

export default AuthLayout;
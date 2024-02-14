import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
const AuthLayout:React.FC = () => {
    // const currentUser = false;
    const isAuthenticated = false;
    return (
        <>
            {isAuthenticated ? (
                <Navigate to="/" />
            ): (
                <div className={"flex items-center justify-evenly h-[100vh]"}>
                    <section>
                        <Outlet />
                    </section>
                    <img
                        className={"w-5/12"}
                        src={"https://i.postimg.cc/RV6NrBYt/Mobile-login-amico-1.png"}
                        alt={"img"}
                    />
                </div>
            )}
        </>
    );
};

export default AuthLayout;
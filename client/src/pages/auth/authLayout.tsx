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
                <div className={"flex items-center justify-between h-[100vh]"}>
                    <section>
                        <Outlet />
                    </section>
                    <img
                        className={"w-5/12"}
                        src={"https://i.postimg.cc/mkbvM0yp/Mobile-login-amico.png"}
                        alt={"img"}
                    />
                </div>
            )}
        </>
    );
};

export default AuthLayout;
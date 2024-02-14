import React from 'react';
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthLayout:React.FC = () => {
    const { currentUser } = useSelector((state) => state.user);
    const userID = currentUser && currentUser.data.data && currentUser.data.data.user ? currentUser.data.data.user._id : null;

    const isAuthenticated = !!userID;
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
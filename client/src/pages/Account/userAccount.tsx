import React from 'react';
import userAccountLogic from "./userAccountLogic.tsx";
const UserAccount:React.FC = () => {
    const {
        currentUser
    } = userAccountLogic();

    return (
        <div className={"p-4"}>
            <p>{currentUser.currentUser.data.data.user.username}</p>
        </div>
    );
};

export default UserAccount;
import React from 'react';
import {useSelector} from "react-redux";
const UserAccount:React.FC = () => {
    const currentUser = useSelector((state) => state.user)
    console.log(currentUser?.currentUser?.data?.data)
    return (
        <div className={"p-4"}>
            <p>{currentUser.name}</p>
        </div>
    );
};

export default UserAccount;
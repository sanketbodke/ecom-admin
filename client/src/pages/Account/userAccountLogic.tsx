import {useSelector} from "react-redux";
const UserAccountLogic = () => {
    const currentUser = useSelector((state) => state.user)
    return {
        currentUser
    }
};

export default UserAccountLogic;
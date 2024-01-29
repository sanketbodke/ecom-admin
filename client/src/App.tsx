import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import authLayout from "@/pages/auth/authLayout.tsx";
import login from "@/pages/auth/forms/login.tsx";
import register from "@/pages/auth/forms/register.tsx";
import privateRoute from "@/components/PrivateRoute.tsx";
import home from "@/pages/home.tsx"
import Navbar from "@/components/Navbar.tsx";
import billBoard from "@/pages/billBoard/billBoard.tsx";
import createBillBoard from "@/pages/billBoard/create.tsx";
import update from "@/pages/billBoard/update.tsx";
const App = () => {
    return (
        <>
            <Router>
                <AppRouter />
            </Router>
        </>
    );
};

function AppRouter(){
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    return (
        <>
            {!isLoginPage && !isRegisterPage && <Navbar />}
            <Routes>
                <Route Component={authLayout}>
                    <Route path="/login" Component={login}></Route>
                    <Route path="/register" Component={register}></Route>
                </Route>
                <Route Component={privateRoute}>
                    <Route index Component={home}></Route>
                    <Route path="/billBoards" Component={billBoard}></Route>
                    <Route path="/billBoards/create" Component={createBillBoard}></Route>
                    <Route path="/billBoards/:id/update" Component={update}></Route>
                </Route>
            </Routes>
        </>
    )
}

export default App;
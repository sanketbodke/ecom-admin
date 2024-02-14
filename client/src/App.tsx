import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/home.tsx";
import {BrowserRouter as Router , Routes, Route, useLocation} from "react-router-dom";
import category from "./pages/category.tsx";
import Login from "./pages/auth/forms/login.tsx";
import Register from "./pages/auth/forms/register.tsx";
import authLayout from "./pages/auth/authLayout.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
function App() {
  return (
    <>
        <Router>
            <AppRouter />
        </Router>
    </>
  )
}

function AppRouter(){
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    const isRegisterPage = location.pathname === "/register";

    return (
        <>
            {!isLoginPage && !isRegisterPage && <Navbar />}
            <Routes>
                <Route Component={authLayout}>
                    <Route path="/login" Component={Login}></Route>
                    <Route path="/register" Component={Register}></Route>
                </Route>

                <Route Component={PrivateRoute}>
                    <Route path="/" Component={Home}></Route>
                    <Route path="/:category" Component={category}></Route>
                </Route>
            </Routes>
            {!isLoginPage && !isRegisterPage && <Footer />}
        </>
    )
}

export default App

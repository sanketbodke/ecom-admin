import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import Home from "./pages/home.tsx";
import {BrowserRouter as Router , Routes, Route, useLocation} from "react-router-dom";
import category from "./pages/category.tsx";
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
                <Route path="/" Component={Home}></Route>
                <Route path="/:category" Component={category}></Route>
            </Routes>
            {!isLoginPage && !isRegisterPage && <Footer />}
        </>
    )
}

export default App

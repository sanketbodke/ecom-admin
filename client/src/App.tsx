import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import authLayout from "@/pages/auth/authLayout.tsx";
import login from "@/pages/auth/forms/login.tsx";
import register from "@/pages/auth/forms/register.tsx";
import privateRoute from "@/components/PrivateRoute.tsx";
import home from "@/pages/home.tsx"
const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route Component={authLayout}>
                        <Route path="/login" Component={login}></Route>
                        <Route path="/register" Component={register}></Route>
                    </Route>
                    <Route Component={privateRoute}>
                        <Route index Component={home}></Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
};

export default App;
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import authLayout from "@/pages/auth/authLayout.tsx";
import login from "@/pages/auth/forms/login.tsx";
import register from "@/pages/auth/forms/register.tsx";
import privateRoute from "@/components/PrivateRoute.tsx";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer.tsx";
// billBoard
import billBoard from "@/pages/billBoard/billBoard.tsx";
import createBillBoard from "@/pages/billBoard/create.tsx";
import update from "@/pages/billBoard/update.tsx";
// categories
import categories from "@/pages/categories/categories.tsx";
import createCategories from "@/pages/categories/create.tsx"
import updateCategories from "@/pages/categories/update.tsx"

// size
import sizes from "@/pages/size/sizes.tsx";
import createSize from "@/pages/size/create.tsx";
import updateSize from "@/pages/size/update.tsx";

// color
import colors from "@/pages/color/Colors.tsx";
import createColor from "@/pages/color/create.tsx";
import updateColor from "@/pages/color/update.tsx";

// products
import product from "@/pages/product/product.tsx";
import createProduct from "@/pages/product/create.tsx"
import updateProduct from "@/pages/product/update.tsx"

// orders
import Order from "@/pages/orders/order.tsx";

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
                    <Route path="/" Component={billBoard}></Route>
                    <Route path="/billBoards/create" Component={createBillBoard}></Route>
                    <Route path="/billBoards/:id/update" Component={update}></Route>

                    <Route path="/categories" Component={categories}></Route>
                    <Route path="/categories/create" Component={createCategories}></Route>
                    <Route path="/categories/:id/update" Component={updateCategories}></Route>

                    <Route path="/sizes" Component={sizes}></Route>
                    <Route path="/sizes/create" Component={createSize}></Route>
                    <Route path="/sizes/:id/update" Component={updateSize}></Route>

                    <Route path="/colors" Component={colors}></Route>
                    <Route path="/color/create" Component={createColor}></Route>
                    <Route path="/colors/:id/update" Component={updateColor}></Route>

                    <Route path="/products" Component={product}></Route>
                    <Route path="/product/create" Component={createProduct}></Route>
                    <Route path="/products/:id/update" Component={updateProduct}></Route>

                    <Route path="/orders" Component={Order}></Route>
                </Route>
            </Routes>
            {!isLoginPage && !isRegisterPage && <Footer />}
        </>
    )
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';
import Profile from "@/components/Profile.tsx";

const Navbar: React.FC = () => {
    return (
        <nav className="flex items-center justify-between border p-4">
            <div className="storeName">
                <h1>store name</h1>
            </div>
            <div className="menuItems flex gap-10 text-sm">
                <Link to="/">BillBoards</Link>
                <Link to="/categories">Categories</Link>
                <Link to="/sizes">Sizes</Link>
                <Link to="/colors">Colors</Link>
                <Link to="/products">Products</Link>
            </div>
            <div className="userProfile w-10 h-10">
                <Profile />
            </div>
        </nav>
    );
};

export default Navbar;

import React from 'react';

const Navbar: React.FC = () => {
    return (
        <nav className="border flex justify-between items-center p-4">
            <div className="flex justify-between items-center text-xl">
                <h1 className="mr-6">STORE</h1>
                <div className="flex justify-between items-center gap-4 text-sm">
                    <p>Shirts</p>
                    <p>Shoes</p>
                </div>
            </div>
            <div className="flex justify-between items-center gap-4 text-sm">
                <p>Cart</p>
                <p>UserName</p>
            </div>
        </nav>

    );
};

export default Navbar;
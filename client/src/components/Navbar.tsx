import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from "@/components/Profile.tsx";

const Navbar: React.FC = () => {
    const [activeLink, setActiveLink] = useState<number | null>(null);

    const handleLinkClick = (index: number) => {
        setActiveLink(index);
    };

    return (
        <nav className="flex items-center justify-between border p-4">
            <div className="storeName">
                <h1>store name</h1>
            </div>
            <div className="menuItems flex gap-10 text-sm">
                {Array.from({ length: 8 }, (_, index) => (
                    <Link
                        to="/"
                        key={index}
                        className={activeLink === index ? 'font-bold' : ''}
                        onClick={() => handleLinkClick(index)}
                    >
                        {index === 0 && 'Overview'}
                        {index === 1 && 'BillBoards'}
                        {index === 2 && 'Categories'}
                        {index === 3 && 'Sizes'}
                        {index === 4 && 'Colors'}
                        {index === 5 && 'Products'}
                        {index === 6 && 'Orders'}
                        {index === 7 && 'Settings'}
                    </Link>
                ))}
            </div>
            <div className="userProfile w-10 h-10">
                <Profile />
            </div>
        </nav>
    );
};

export default Navbar;

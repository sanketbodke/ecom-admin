import React, {useEffect, useState} from 'react';
import axios from "axios"
import API_BASE_URL from "../constant.ts";
import {Link} from "react-router-dom";
const Navbar: React.FC = () => {
    const [categories, setCategories] = useState({})
    useEffect(() => {
        const getCategories = async () => {
            try{
                const response = await axios.get(`${API_BASE_URL}/api/v1/categories`)
                setCategories(response.data.data)
            }catch (error){
                console.log(error)
            }
        }
        getCategories();
    }, []);
    return (
        <nav className="border flex justify-between items-center p-4">
            <div className="flex justify-between items-center text-xl">
                <h1 className="mr-6">STORE</h1>
                <div className="flex justify-between items-center gap-4 text-sm">
                    {categories.length > 0 ? (
                        categories.map((category, key) => (
                        <Link key={key} to={category.name}>{category.name}</Link>
                        ))
                    ) : (
                        <p>No Categories</p>
                    )}
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
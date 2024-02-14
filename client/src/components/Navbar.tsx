import React, {useEffect, useState} from 'react';
import axios from "axios"
import API_BASE_URL from "../constant.ts";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import { GrCart } from "react-icons/gr";
import { FaRegUser } from "react-icons/fa6";
const Navbar: React.FC = () => {
    const [categories, setCategories] = useState({})
    const { currentUser } = useSelector((state) => state.user);
    const userName = currentUser?.data?.data?.user?.username || "";
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
                <Link to="/" className="mr-6">STORE</Link>
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
                <Link to={"/my-cart"} className="flex items-center gap-1"><GrCart /> Cart</Link>
                <p className="flex items-center gap-1"><FaRegUser /> {userName}</p>
            </div>
        </nav>

    );
};

export default Navbar;
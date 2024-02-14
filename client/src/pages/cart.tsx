import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../constant.ts";
import {Link} from "react-router-dom"
import {Button} from "../components/ui/button.tsx";

const Cart: React.FC = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const cart = currentUser?.data?.data?.user?.cart || [];
                cart.map(async (id: number) => {
                    const response = await axios.get(`${API_BASE_URL}/api/v1/products/${id}`);
                    setCartProducts(response.data.data)
                });
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };
        getProducts();
    }, [currentUser]);

    return (
        <div className={"flex justify-between text-sm p-4"}>
            <div className={"flex gap-4"}>
                <img
                    src={cartProducts.productImage}
                    alt={"Product img"}
                    className={"w-36 h-32 object-cover bg-center"}
                />
                <div>
                    <p>Name : {cartProducts.name}</p>
                    <p>Size : {cartProducts.size}</p>
                    <p>Color : {cartProducts.color}</p>
                    <p>Price: &#8377; {cartProducts.price}</p>
                    <p className={"text-green-800 cursor-pointer"}>Delete</p>
                </div>
            </div>
            <div className={"border w-80 p-2"}>
                <p>Subtotal (5 items): RS 34,860.00</p>
                <Button className={"mt-4"}>Proceed to Buy</Button>
            </div>
        </div>
    );
};

export default Cart;

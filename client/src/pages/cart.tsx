import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import axios from "axios";
import API_BASE_URL from "../constant.ts";
import {Button} from "../components/ui/button.tsx";

const Cart: React.FC = () => {
    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser?.data?.data?.user?._id || ""
    const [cartProducts, setCartProducts] = useState([]);
    const subtotal = cartProducts.reduce((accumulator, product) => accumulator + parseFloat(product.price), 0);
    useEffect(() => {
        const getProducts = async () => {
            try {
                const cartProducts = await axios.get(`${API_BASE_URL}/api/v1/products/cart/${userId}`)
                setCartProducts(cartProducts.data.data)
            } catch (error) {
                console.error('Error fetching cart products:', error);
            }
        };
        getProducts();
    }, []);

    return (
        <div className={"flex justify-between p-4 text-sm"}>
            <div className={"flex flex-col gap-6 basis-[75%]"}>
                {cartProducts.map((product, index) => (
                    <div key={index} className={"flex items-center gap-4 border basis-3/5"}>
                        <img
                            src={product.productImage}
                            alt={"Product img"}
                            className={"w-36 h-32 object-cover bg-center"}
                        />
                        <div>
                            <p>Name : {product.name}</p>
                            <p>Size : {product.size}</p>
                            <p>Color : {product.color}</p>
                            <p>Price: &#8377; {product.price}</p>
                            <p className={"text-green-800 cursor-pointer"}>Delete</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={"border w-80 h-fit p-2 basis-[23%]"}>
                <p>Subtotal ({cartProducts.length} item{cartProducts.length !== 1 ? 's' : ''}) &#8377;{subtotal}</p>
                <Button
                    className={"mt-4"}
                >Proceed to Buy</Button>
            </div>
        </div>
    );

};

export default Cart;

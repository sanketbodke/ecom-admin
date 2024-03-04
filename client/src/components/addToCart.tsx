import React from 'react';
import axios from "axios";
import API_BASE_URL from "../constant.ts";
import { message } from "antd";
import { GrCart } from "react-icons/gr";

const AddToCart: React.FC<{ product: { _id: number } }> = ({ product }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const handleAddToCart = async (productId: number) => {
        try {
            const cartItem = {
                productId: productId,
                userId: `65a9318f91a13940fb7f208a` // to do
            };
            await axios.post(
                `${API_BASE_URL}/api/v1/products/add-to-cart`,
                cartItem
            )
            messageApi.open({
                type: 'success',
                content: 'Product added to cart',
            });
        } catch (error) {
            console.log(error)
            messageApi.open({
                type: 'error',
                content: 'Failed to add',
            });
        }
    }

    return (
        <div>
            {contextHolder}
            <GrCart onClick={() => handleAddToCart(product._id)} className={"text-2xl bg-white text-black rounded p-1"} />
        </div>
    );
};

export default AddToCart;

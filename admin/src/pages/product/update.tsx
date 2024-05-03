import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Heading from "@/components/heading.tsx";
import { message } from 'antd';
const Update:React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {id } = useParams()
    const [products, setProducts] = useState({});

    useEffect(() => {
        console.log(products)
        axios
            .get(`${API_BASE_URL}/api/v1/products/${id}`)
            .then((response) => {
                setProducts(response.data.data)
            })
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProducts((preProducts) => ({
            ...preProducts,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.put(
                `${API_BASE_URL}/api/v1/products/${id}/update`,
                products
            )
            navigate("/products")
            messageApi.open({
                type: 'success',
                content: 'Product Updated',
            });
        }catch (error){
            messageApi.open({
                type: 'error',
                content: 'Update Failed',
            });
        }
    }
    return (
        <div className="container">
            {contextHolder}
            <div className="border-b mb-4 mt-4 pb-4">
                <Heading
                    title="Update Product"
                    subtitle="Update a Product"
                />
            </div>
            <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
                <Input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={products.name || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Input
                    type="text"
                    name="featured"
                    placeholder="Featured"
                    value={products.featured || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Input
                    type="text"
                    name="price"
                    placeholder="Price"
                    value={products.price || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={products.category || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={products.size || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={products.color || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <img src={products.productImage} alt="product image" className="w-72 h-60 object-cover"/>

                <Button type="submit" className={"w-24"}>Update</Button>
            </form>
        </div>
    );
};

export default Update;
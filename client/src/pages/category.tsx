import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../constant.ts";

const Category: React.FC = () => {
    const { category } = useParams();
    const [categoryBillBoard, setCategoryBillBoard] = useState({});
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);

    useEffect(() => {
        const categoryResponse = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/category/${category}`);
            setCategoryBillBoard(response.data.data);
        };

        const getCategoryProducts = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/products/category/${category}`);
            setCategoryProducts(response.data.data);
        };

        const getSizes = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/sizes`);
            setSizes(response.data.data)
        }

        const getColors = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/colors`)
            setColors(response.data.data)
        }
        categoryResponse();
        getCategoryProducts();
        getColors();
        getSizes();
    }, [category]);

    return (
        <>
            <div className="relative flex justify-center m-4">
                <img src={categoryBillBoard.coverImage} className="h-[330px] w-[100%] object-cover rounded-[10px]" alt="Category Cover"/>
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 px-4 py-2 rounded">
                    {categoryBillBoard.label}
                </p>
            </div>
            <div className="flex gap-10 p-4">
                <div className="w-[180px]">
                    <div>
                        <h3 className="border-b pb-4 mb-4 font-bold">Sizes</h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {sizes.map((sizeObj, index) => (
                                <p key={index} className="border px-2 py-0.5">{sizeObj.name}</p>
                            ))}
                        </div>

                    </div>
                    <div>
                        <h3 className="border-b pb-4 my-4 font-bold">Colors</h3>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {colors.map((colorObj, index) => (
                                <p key={index} className="border px-2 py-0.5">{colorObj.name}</p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 flex-wrap">
                    {categoryProducts.map((product, index) => (
                        <div
                            key={index}
                            className="border text-sm p-2"
                        >
                            <img
                                src={product.productImage}
                                alt="img"
                                className="w-52 h-52 object-cover"
                            />
                            <p className="font-bold my-1">{product.name}</p>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="font-bold mt-1.5">&#8377; {product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Category;

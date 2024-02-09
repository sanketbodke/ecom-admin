import React, {useEffect, useState} from 'react';
import axios from "axios";
import API_BASE_URL from "../constant.ts";
const Home:React.FC = () => {
    const [billBoard, setBillBoard] = useState({});
    const [featuredProducts, setFeaturedProducts] = useState([]);
    useEffect(() => {
        const getBillBoard = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/billBoard/65c61080c2bdd2584a209083`);
            setBillBoard(response.data.data);
        }

        const getFeaturedProducts = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/products`)
            setFeaturedProducts(response.data.data);
            console.log(response.data.data)
        }

        getBillBoard()
        getFeaturedProducts()
    }, []);
    return (
        <div>
            <div className="relative flex justify-center m-4">
                <img src={billBoard.coverImage} className="h-[330px] w-[100%] object-cover rounded-[10px]"
                     alt="Category Cover"/>
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 px-4 py-2 rounded">
                    {billBoard.label}
                </p>
            </div>
            <div className="flex gap-6 flex-wrap m-4">
                {featuredProducts.map((product, index) => (
                    product.featured ? (
                        <div key={index} className="border text-sm p-2">
                            <img src={product.productImage} alt="img" className="w-52 h-52 object-cover" />
                            <p className="font-bold my-1">{product.name}</p>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="font-bold mt-1.5">&#8377; {product.price}</p>
                        </div>
                    ) : (
                        <></>
                    )
                ))}
            </div>
        </div>
    );
};

export default Home;
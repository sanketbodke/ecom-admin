import React, { useEffect, useState } from 'react';
import axios from "axios";
import API_BASE_URL from "../constant.ts";
import { GrCart } from "react-icons/gr";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { message } from "antd";
import CustomModal from "../components/ui/modal.tsx";

const Home: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [billBoard, setBillBoard] = useState({});
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleCardClick = (index: number) => {
        setClickedIndex(index);
        setSelectedProduct(featuredProducts[index]);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        const getBillBoard = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/billBoard/65c61080c2bdd2584a209083`);
            setBillBoard(response.data.data);
        }

        const getFeaturedProducts = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/v1/products`)
            setFeaturedProducts(response.data.data);
        }

        getBillBoard();
        getFeaturedProducts();
    }, []);

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

    const handleZoomOutClick = () => {
        setIsModalVisible(true);
    }

    return (
        <div>
            {contextHolder}
            <div className="relative flex justify-center m-4">
                <img src={billBoard.coverImage} className="h-[330px] w-[100%] object-cover rounded-[10px]"
                     alt="Category Cover" />
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-75 px-4 py-2 rounded">
                    {billBoard.label}
                </p>
            </div>
            <div className="flex gap-6 flex-wrap m-4">
                {featuredProducts.map((product, index) => (
                    <div key={index} className={`border text-sm p-2 relative ${clickedIndex === index ? 'hover:shadow-lg' : 'hover:shadow'}`} onClick={() => handleCardClick(index)}>
                        <img src={product.productImage} alt="img" className="w-52 h-52 object-cover" />
                        <p className="font-bold my-1">{product.name}</p>
                        <p className="text-gray-500">{product.category}</p>
                        <p className="font-bold mt-1.5">&#8377; {product.price}</p>
                        {clickedIndex === index && (
                            <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center gap-2 cursor-pointer">
                                <MdOutlineZoomOutMap onClick={handleZoomOutClick} className={"text-2xl bg-white text-black rounded p-1"} />
                                <GrCart onClick={() => handleAddToCart(product._id)} className={"text-2xl bg-white text-black rounded p-1"} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {selectedProduct && (
                <CustomModal
                    visible={isModalVisible}
                    cancel={handleCancel}
                    productDetails={selectedProduct}
                />
            )}
        </div>
    );
};

export default Home;

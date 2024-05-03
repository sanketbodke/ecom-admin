import { useEffect, useState } from 'react';
import { getBillBoard, getFeaturedProducts } from '../../api/home.api.ts';

const HomeLogic = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [billBoard, setBillBoard] = useState({});
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleCardClick = (index: number) => {
        setClickedIndex(index);
        setSelectedProduct(featuredProducts[index]);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleZoomOutClick = () => {
        setIsModalVisible(true);
    };

    useEffect(() => {
        getBillBoard(setBillBoard);
        getFeaturedProducts(setFeaturedProducts);
    }, []);

    return {
        isModalVisible,
        billBoard,
        featuredProducts,
        clickedIndex,
        selectedProduct,
        handleCardClick,
        handleCancel,
        handleZoomOutClick,
    };
};

export default HomeLogic;

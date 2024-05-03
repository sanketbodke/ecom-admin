import {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getCategoryBillBoard, getCategoryProducts, getColors, getSizes} from "../../api/category.api.ts";

const CategoryLogic = () => {
    const { category } = useParams();
    const [categoryBillBoard, setCategoryBillBoard] = useState({});
    const [categoryProducts, setCategoryProducts] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    useEffect(() => {
        getCategoryBillBoard(category, setCategoryBillBoard);
        getCategoryProducts(category, setCategoryProducts);
        getSizes(setSizes);
        getColors(setColors);
    }, [category]);

    const handleCardClick = (index: number) => {
        setClickedIndex(index);
        setSelectedProduct(categoryProducts[index]);
    };

    const handleZoomOutClick = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return {
        categoryBillBoard,
        categoryProducts,
        sizes,
        colors,
        isModalVisible,
        clickedIndex,
        selectedProduct,
        handleCardClick,
        handleZoomOutClick,
        handleCancel,
    }
};

export default CategoryLogic;
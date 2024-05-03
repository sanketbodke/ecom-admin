import axios from 'axios';
import API_BASE_URL from '../constant.ts';
import React from "react";

interface Billboard {
    category: string;
    setCategoryBillBoard:  React.Dispatch<React.SetStateAction<Billboard[]>>;
}

interface Product {
    category: string;
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

interface Size {
    setSize : React.Dispatch<React.SetStateAction<Size[]>>;
}

interface Color {
    setColor : React.Dispatch<React.SetStateAction<Color[]>>;
}
export const getCategoryBillBoard = async (category: string, setCategoryBillBoard : React.Dispatch<React.SetStateAction<Billboard[]>>) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/category/${category}`);
    setCategoryBillBoard(response.data.data);
};

export const getCategoryProducts = async (category: string, setCategoryProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products/category/${category}`);
    setCategoryProducts(response.data.data);
};

export const getSizes = async (setSizes : React.Dispatch<React.SetStateAction<Size[]>>) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/sizes`);
    setSizes(response.data.data);
};

export const getColors = async (setColors: React.Dispatch<React.SetStateAction<Color[]>>) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/colors`);
    setColors(response.data.data);
};
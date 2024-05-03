import axios from "axios";
import API_BASE_URL from "../constant.ts";
import React from "react";

interface Billboard {
    setBillBoard:  React.Dispatch<React.SetStateAction<Billboard[]>>;
}
interface Product {
    setFeaturedProducts:  React.Dispatch<React.SetStateAction<Product[]>>;
}
export const getBillBoard = async (setBillBoard: React.Dispatch<React.SetStateAction<Billboard[]>>) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/billBoard/65c61080c2bdd2584a209083`);
    setBillBoard(response.data.data);
}

export const getFeaturedProducts = async (setFeaturedProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
    const response = await axios.get(`${API_BASE_URL}/api/v1/products`)
    setFeaturedProducts(response.data.data);
}
import axios from "axios";
import API_BASE_URL from "../constant.ts";

interface Product {
    userId: number;
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}
export const getProducts = async (userId: number, setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>)=> {
    try {
        const cartProducts = await axios.get(`${API_BASE_URL}/api/v1/products/cart/${userId}`);
        setCartProducts(cartProducts.data.data);
    } catch (error) {
        console.error('Error fetching cart products:', error);
    }
};

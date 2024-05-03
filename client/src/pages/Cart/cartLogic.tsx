import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import axios from "axios";
import API_BASE_URL from "../../constant.ts";
import {getProducts} from "../../api/cart.api.ts"


const CartLogic = () => {
    const { currentUser } = useSelector((state) => state.user);
    const userId = currentUser?.data?.data?.user?._id || ""
    const [cartProducts, setCartProducts] = useState([]);
    const [subtotal, setSubTotal] = useState(0)
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        getProducts(userId, setCartProducts);
        const handleSubtotal = () => {
            const subTotal = cartProducts.reduce((accumulator, product) => accumulator + parseFloat(String(product.price * product.quantity)), 0);
            setSubTotal(subTotal)
        }
        handleSubtotal();
    }, [cartProducts]);

    const handlePayment = async () => {
        try{
            setLoading(true)
            const response = await axios.post(`${API_BASE_URL}/api/v1/payment`, { items: cartProducts });
            window.location.href = response.data.url;
            setLoading(false)
        } catch(error) {
            console.log(error)
            setLoading(false)
        }
    }
    const handleQuantityChange = async (e, id: number) => {
        try {
            await axios.put(
                `${API_BASE_URL}/api/v1/products/${id}/update`,
                { quantity: e.target.value }
            );
            const updatedCartProducts = cartProducts.map(product => {
                if (product._id === id) {
                    return {
                        ...product,
                        quantity: e.target.value
                    };
                }
                return product;
            });
            setCartProducts(updatedCartProducts);
        } catch (error) {
            console.error(error);
        }
    };
    return {
        cartProducts,
        subtotal,
        loading,
        handlePayment,
        handleQuantityChange,
    }
};

export default CartLogic;
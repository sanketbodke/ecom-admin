import React, {useState, useEffect} from 'react';
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
const Order:React.FC = () => {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        getOrders()
    }, []);
    const getOrders = async () => {
        try{
            const ordersResponse = await axios.get(`${API_BASE_URL}/api/v1/payment`)
            console.log(ordersResponse.data.data.data[0])
        }catch (error){
            console.error(error)
        }
    }
    return (
        <div>

        </div>
    );
};

export default Order;
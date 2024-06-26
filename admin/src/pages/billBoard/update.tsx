import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios"
import API_BASE_URL from "@/constant.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Heading from "@/components/heading.tsx";
import { message } from 'antd';

const Update: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {id } = useParams()
    const [billBoard, setBillBoard] = useState({})
    // const navigate = useNavigate()

    useEffect(()=> {
        axios
            .get(`${API_BASE_URL}/api/v1/billBoard/${id}`)
            .then((response)=> {
                setBillBoard(response.data.data)
            })
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setBillBoard((preBillBoard) => ({
            ...preBillBoard,
                [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await
                axios.put(
                `${API_BASE_URL}/api/v1/billBoard/${id}/update`,
                    billBoard
                )
            navigate("/billBoards")
            messageApi.open({
                type: 'success',
                content: 'BillBoard Updated',
            });
        }catch (error){
            messageApi.open({
                type: 'error',
                content: 'Update Failed',
            });
        }
    }
    return (
        <>
            <div className="container">
                {contextHolder}
                <div className="border-b mb-4 mt-4 pb-4">
                    <Heading
                        title="Update billboard"
                        subtitle="Update a billboard"
                    />
                </div>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <Input
                        type="text"
                        name="label"
                        placeholder={"BillBoard Name"}
                        value={billBoard.label || ""}
                        onChange={handleInputChange}
                        className="w-72"
                    />
                    <img
                        src={billBoard.coverImage}
                        alt="cover image"
                        className="w-72 h-60 object-cover"
                    />
                    <Button type="submit">Update</Button>
                </form>
            </div>
        </>
    );
};

export default Update;
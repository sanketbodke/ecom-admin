import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Heading from "@/components/heading.tsx";
import { message } from 'antd';
const Update:React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const {id } = useParams()
    const [sizes, setSizes] = useState({});

    useEffect(() => {
         axios
            .get(`${API_BASE_URL}/api/v1/sizes/${id}`)
            .then((response) => {
                setSizes(response.data.data)
            })
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSizes((preSizes) => ({
            ...preSizes,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.put(
                `${API_BASE_URL}/api/v1/sizes/${id}/update`,
                sizes
            )
            navigate("/sizes")
            messageApi.open({
                type: 'success',
                content: 'Size Updated',
            });
        }catch (error){
            messageApi.open({
                type: 'error',
                content: 'Update Failed',
            });
        }
    }
    return (
        <div className="container">
            {contextHolder}
            <div className="border-b mb-4 mt-4 pb-4">
                <Heading
                    title="Update Size"
                    subtitle="Update a Size"
                />
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <Input
                    type="text"
                    name="name"
                    placeholder="Color Name"
                    value={sizes.name || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Input
                    type="text"
                    name="value"
                    placeholder="Color Value"
                    value={sizes.value || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Button type="submit">Update</Button>
            </form>
        </div>
    );
};

export default Update;
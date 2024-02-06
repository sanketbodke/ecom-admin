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
    const [colors, setColors] = useState({});

    useEffect(() => {
        console.log(colors)
        axios
            .get(`${API_BASE_URL}/api/v1/colors/${id}`)
            .then((response) => {
                setColors(response.data.data)
            })
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setColors((preColors) => ({
            ...preColors,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await axios.put(
                `${API_BASE_URL}/api/v1/colors/${id}/update`,
                colors
            )
            navigate("/colors")
            messageApi.open({
                type: 'success',
                content: 'Color Updated',
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
                    title="Update Color"
                    subtitle="Update a Color"
                />
            </div>
            <form onSubmit={handleSubmit} className="space-y-8">
                <Input
                    type="text"
                    name="name"
                    placeholder="Color Name"
                    value={colors.name || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Input
                    type="text"
                    name="value"
                    placeholder="Color Value"
                    value={colors.value || ""}
                    onChange={handleInputChange}
                    className="w-72"
                />

                <Button type="submit">Update</Button>
            </form>
        </div>
    );
};

export default Update;
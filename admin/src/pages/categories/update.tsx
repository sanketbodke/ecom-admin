import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "@/constant.ts";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Heading from "@/components/heading.tsx";
import { message } from 'antd';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";

const Update:React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [billBoard, setBillBoard] = useState<any[]>([]);
    const {id } = useParams()
    const [categories, setCategories] = useState({})

    useEffect(() => {
        axios
            .get(`${API_BASE_URL}/api/v1/categories/${id}`)
            .then((response) => {
                setCategories(response.data.data)
            })

        const getBillBoards = async () => {
            try {
                const billBoardData = await axios.get(
                    `${API_BASE_URL}/api/v1/billBoard`
                )
                setBillBoard(billBoardData.data.data);
            } catch (error) {
                console.log(error)
            }
        }

        getBillBoards();
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setCategories((preCategories) => ({
            ...preCategories,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await
                axios.put(
                    `${API_BASE_URL}/api/v1/categories/${id}/update`,
                    categories
                )
            navigate("/categories")
            messageApi.open({
                type: 'success',
                content: 'Category Updated',
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
                    title="Update Category"
                    subtitle="Update a Category"
                 />
             </div>
             <form onSubmit={handleSubmit} className="space-y-8">
                 <Input
                    type="text"
                    name="name"
                    placeholder="Category Name"
                    value={categories.name || ""}
                    onChange={handleInputChange}
                    className="w-72"
                 />
                 <Select>
                     <SelectTrigger className="w-72">
                         <SelectValue placeholder={categories.content || "Select billBoard"} />
                     </SelectTrigger>
                     <SelectContent>
                         {billBoard.map((data, key) => (
                             <SelectItem key={key} value={data._id}>
                                 {data.label}
                             </SelectItem>
                         ))}
                     </SelectContent>
                 </Select>
                 <Button type="submit">Update</Button>
             </form>
         </div>
    );
};

export default Update;
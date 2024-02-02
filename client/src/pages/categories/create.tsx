import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import API_BASE_URL from "@/constant.ts";
import axios from "axios";
import Heading from "@/components/heading.tsx";
import { message } from 'antd';
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name: z.string(),
    content: z.string()
});

type FormData = z.infer<typeof formSchema>;

const Create: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [billBoard, setBillBoard] = useState<any[]>([]); // Corrected: Initialize as an empty array
    const navigate = useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            content: "",
        },
    });

    const [formData, setFormData] = useState<FormData>({
        name: "",
        content: "",
    });

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleChange(name as keyof FormData, value);
    };

    const onSubmit: SubmitHandler<FormData> = async () => {
        try {
            await axios.post(
                `${API_BASE_URL}/api/v1/categories/create`,
                formData
            )
            navigate("/categories")
            messageApi.open({
                type: 'success',
                content: 'Category Created',
            });
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Failed to create Category',
            });
        }
    };

    useEffect(() => {
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
    }, []);

    return (
        <div className="container mt-4">
            {contextHolder}
            <div className="border-b mb-4 pb-4">
                <Heading
                    title="Create Category"
                    subtitle="Add a new category"
                />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({}) => (
                            <FormItem>
                                <FormLabel className="text-gray-500">Name</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-72"
                                />

                                <FormLabel className="text-gray-500">BillBoard</FormLabel>
                                <Select>
                                    <SelectTrigger className="w-72">
                                        <SelectValue placeholder="Select BillBoard" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {billBoard.map((data, key) => (
                                            <SelectItem key={key} value={data._id}>
                                                {data.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Form>
        </div>
    );
};

export default Create;

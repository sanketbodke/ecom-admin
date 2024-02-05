import React, { useState } from 'react';
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
import { Input } from "@/components/ui/input"
import UploadWidget from "@/components/UploadWidget.tsx";
import API_BASE_URL from "@/constant.ts";
import axios from "axios";
import Heading from "@/components/heading.tsx";
import { message } from 'antd';
import {useNavigate} from "react-router-dom";

const formSchema = z.object({
    label: z.string(),
    coverImage: z.string()
});

type FormData = z.infer<typeof formSchema>;

const Create: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            label: "",
            coverImage: "",
        },
    });

    const [formData, setFormData] = useState<FormData>({
        label: "",
        coverImage: "",
    });

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleImageUpload = (imageUrl: string) => {
        handleChange("coverImage", imageUrl);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleChange(name as keyof FormData, value);
    };

    const handleSubmit: SubmitHandler<FormData> = async () => {
        try{
             await
                axios.post(
                    `${API_BASE_URL}/api/v1/billBoard/create`,
                    formData
                )
             navigate("/billBoards")
             messageApi.open({
                type: 'success',
                content: 'BillBoard Created',
            });
        } catch (error){
            messageApi.open({
                type: 'error',
                content: 'Failed to create BillBoard',
            });
        }
    };

    return (
        <div className="container mt-4">
            {contextHolder}
            <div className="border-b mb-4 pb-4">
                <Heading
                    title="Create billboard"
                    subtitle="Add a new billboard"
                />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="label"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-gray-500">Label</FormLabel>
                                <Input
                                    type="text"
                                    name="label"
                                    value={formData.label}
                                    onChange={handleInputChange}
                                    className="w-72"
                                />
                                <UploadWidget onImageUpload={handleImageUpload} />
                                {formData.coverImage && (
                                    <img
                                        src={formData.coverImage}
                                        alt="Uploaded Cover"
                                        className="w-72 h-60 object-cover"
                                    />
                                )}
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

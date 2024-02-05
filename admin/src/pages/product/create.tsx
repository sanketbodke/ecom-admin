import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
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
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input.tsx";
import UploadWidget from "@/components/UploadWidget.tsx";
import API_BASE_URL from "@/constant.ts";
import axios from "axios";
import Heading from "@/components/heading.tsx";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name: z.string(),
    featured: z.boolean(),
    price: z.string(),
    productImage: z.string(),
    category: z.string(),
    size: z.string(),
    color: z.string()
})

type FormData = z.infer<typeof formSchema>

const Create: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const [categories, setCategories] = useState<any[]>([]);
    const [sizes, setSizes] = useState<any[]>([]);
    const [colors, setColors] = useState<any[]>([]);
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            featured: false,
            price: "",
            productImage: "",
            category: "",
            size: "",
            color: ""
        }
    })

    const [formData, setFormData] = useState<FormData>({
        name: "",
        featured: false,
        price: "",
        productImage: "",
        category: "",
        size: "",
        color: ""
    })

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
        form.setValue(field, value); // Use setValue to update form values
    };

    const handleImageUpload = (imageUrl: string) => {
        handleChange("productImage", imageUrl);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleChange(name as keyof FormData, value);
    };

    const handleSubmit: SubmitHandler<FormData> = async () => {
        try {
            console.log(formData)
            await
                axios.post(
                    `${API_BASE_URL}/api/v1/product/create`,
                    formData
                )
            navigate("/products")
            messageApi.open({
                type: 'success',
                content: 'Product Created',
            })
        } catch (error) {
            console.log()
            messageApi.open({
                type: 'error',
                content: 'Failed to create Product'
            })
        }
    }
    useEffect(() => {
        const getCategories = async () => {
            try {
                const categoriesData = await
                    axios.get(`${API_BASE_URL}/api/v1/categories`)
                setCategories(categoriesData.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getSizes = async () => {
            try {
                const sizesData = await
                    axios.get(`${API_BASE_URL}/api/v1/size`)
                setSizes(sizesData.data.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getColors = async () => {
            try {
                const colorsData = await
                    axios.get(`${API_BASE_URL}/api/v1/color`)
                setColors(colorsData.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getCategories();
        getSizes();
        getColors();
    }, []);
    return (
        <div className="container mt-4">
            {contextHolder}
            <div className="border-b mb-4 pb-4">
                <Heading
                    title="Create Product"
                    subtitle="Add a new Product"
                />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({}) => (
                            <FormItem className="flex flex-wrap gap-6">
                                <div className="flex flex-col gap-4">
                                    <FormLabel className="text-gray-500">Name</FormLabel>
                                    <Input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-72"
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormLabel className="text-gray-500">Price</FormLabel>
                                    <Input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        className="w-72"
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormLabel className="text-gray-500">Category</FormLabel>
                                    <Select>
                                        <SelectTrigger className="w-72">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((data, key) => (
                                                <SelectItem key={key} value={data._id}>
                                                    {data.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormLabel className="text-gray-500">Size</FormLabel>
                                    <Select>
                                        <SelectTrigger className="w-72">
                                            <SelectValue placeholder="Select Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sizes.map((data, key) => (
                                                <SelectItem key={key} value={data._id}>
                                                    {data.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormLabel className="text-gray-500">Color</FormLabel>
                                    <Select>
                                        <SelectTrigger className="w-72">
                                            <SelectValue placeholder="Select Color" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {colors.map((data, key) => (
                                                <SelectItem key={key} value={data._id}>
                                                    {data.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-4 border p-3 h-20 w-72">
                                    <div className="flex items-center gap-2">
                                        <Checkbox />
                                        <FormLabel className="text-gray-500">Featured</FormLabel>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">This product will appear on the home page</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <FormLabel className="text-gray-500">Image</FormLabel>
                                    <UploadWidget onImageUpload={handleImageUpload} />
                                    {formData.productImage && (
                                        <img
                                            src={formData.productImage}
                                            alt="Uploaded Cover"
                                            className="w-72 h-60 object-cover"
                                        />
                                    )}
                                </div>
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

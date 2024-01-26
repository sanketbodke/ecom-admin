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

type FormData = z.infer<typeof formSchema>;

const formSchema = z.object({
    label: z.string(),
    coverImage: z.string()
});

const CreateBillBoard: React.FC = () => {
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

    const onSubmit: SubmitHandler<FormData> = async () => {
        try{
             await
                axios.post(
                    `${API_BASE_URL}/api/v1/billBoard/create`,
                    formData
                )
            console.log(formData)
        } catch (error){
            console.log(error)
        }
    };

    return (
        <div className="container mt-4">
            <div className="border-b mb-4 pb-4">
                <h1 className="text-2xl font-bold">Create billboard</h1>
                <p className="text-sm text-gray-500">Add a new billboard</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

export default CreateBillBoard;

import React , {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form"
import * as z from "zod"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import API_BASE_URL from "@/constant.ts";
import axios from "axios";
import Heading from "@/components/heading.tsx";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name: z.string(),
    value: z.string()
});

type FormData = z.infer<typeof formSchema>

const Create: React.FC = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate();
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            value: "",
        },
    });

    const [formData, setFormData] = useState<FormData>({
       name: "",
       value: "",
    });

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        handleChange(name as keyof FormData, value);
    };

    const handleSubmit: SubmitHandler<FormData> = async () => {
        console.log(formData)
        try{
            await axios.post(
                `${API_BASE_URL}/api/v1/size/create`,
                formData
            )
            navigate("/sizes")
            messageApi.open({
                type: 'success',
                content: 'Size Created',
            });
        }catch (error){
            messageApi.open({
                type: 'error',
                content: 'Failed to create Size',
            });
        }
    }

    return(
        <div className="container mt-4">
            {contextHolder}
            <div className="border-b mb-4 pb-4">
                <Heading
                    title="Create Size"
                    subtitle="Add a new Size"
                />
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
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

                                <FormLabel className="text-gray-500">Value</FormLabel>
                                <Input
                                    type="text"
                                    name="value"
                                    value={formData.value}
                                    onChange={handleInputChange}
                                    className="w-72"
                                />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Form>
        </div>
    )
}

export default Create;
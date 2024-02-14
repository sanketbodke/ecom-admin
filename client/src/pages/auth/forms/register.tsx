import React,{useState} from 'react';
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../../components/ui/button.tsx"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "../../../components/ui/form.tsx"
import { Input } from "../../../components/ui/input.tsx"
import {Link} from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../../constant.ts";

const formSchema = z.object({
    username: z.string(),
    fullName: z.string(),
    email: z.string(),
    password: z.string(),
})
const Register:React.FC = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            fullName: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        //await axios.post(`${API_BASE_URL}/api/v1/register`, values)
        console.log(values)
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-96 flex flex-col gap-8"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={"username"} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={"fullName"} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={"email"} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder={"password"} {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-24"
                    >
                        Register
                    </Button>
                    <Link className={"text-sm"} to={"/login"}>Already have an account ? Login</Link>
                </form>
            </Form>
        </>
    );
};

export default Register;
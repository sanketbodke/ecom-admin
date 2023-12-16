"use client"

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    username: z.string().min(5).max(20),
    fullName: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    avatar: z.string(),
});

const Page = () => {
    const form = useForm({
        defaultValues: {
            username: "JohnD",
            fullName: "John Deo",
            email: "john@gmail.com",
            password: "1234567",
            avatar: "",
        },
        resolver: zodResolver(formSchema),
    });

     function onSubmit(values: z.infer<typeof formSchema>) {
            console.log(values);
    }

    return (
        <div className="container flex justify-center items-center h-[100vh]">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="shadow py-10 px-24 flex flex-col gap-5">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Username" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Full Name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="avatar"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Avatar</FormLabel>
                                <FormControl>
                                    <Input type="file" {...field} />
                                </FormControl>
                                <FormDescription>Upload your image</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default Page;

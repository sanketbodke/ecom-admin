import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import axios from "axios";

interface FormData {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

const formSchema = z.object({
    username: z.string().refine((value) => value.trim() !== "", {
        message: "Username is required",
    }),
    fullName: z.string().refine((value) => value.trim() !== "", {
        message: "Full Name is required",
    }),
    email: z.string().refine((value) => value.trim() !== "", {
        message: "Email is required",
    }),
    password: z.string().refine((value) => value.trim() !== "", {
        message: "Password is required",
    }),
});

const Register = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (values: object) => {
        try {
            const formResponse = await axios.post(
                "http://localhost:4000/api/v1/users/register",
                values
            );
            console.log(formResponse.data);
        } catch (error) {
            console.error(`Error submitting form ${error}`);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Username" {...field} />
                            </FormControl>
                            {fieldState?.error && (
                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            {fieldState?.error && (
                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="Email" {...field} />
                            </FormControl>
                            {fieldState?.error && (
                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="password" placeholder="Password" {...field} />
                            </FormControl>
                            {fieldState?.error && (
                                <FormMessage>{fieldState?.error?.message}</FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
                <Link to="/login">login</Link>
            </form>
        </Form>
    );
};

export default Register;
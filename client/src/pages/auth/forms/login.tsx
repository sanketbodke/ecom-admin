import React from 'react';
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
import {Link, useNavigate} from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import API_BASE_URL from "../../../constant.ts";
import { logInStart, logInSuccess ,logInFailure } from "../../../redux/user/userSlice";
import {useDispatch, useSelector} from "react-redux"

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
})
const Login:React.FC = () => {
    const dispatch = useDispatch();
    const {loading, error} = useSelector((state) => state.user)
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            dispatch(logInStart())
            const response = await axios.post(`${API_BASE_URL}/api/v1/users/login`, values)
            dispatch(logInSuccess(response))
            setCookies("access_token", response.data.data.accessToken);
            navigate("/")
        }catch (error){
            dispatch(logInFailure(error))
            console.log(error)
        }
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
                        Login
                    </Button>
                    <Link className={"text-sm"} to={"/register"}>Don't have an account ? Register</Link>
                </form>
            </Form>
        </>
    );
};

export default Login;
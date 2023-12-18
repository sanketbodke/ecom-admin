import { z } from "zod"
import { SignupValidationSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loader from "@/components/shared/Loader"
import { Link } from "react-router-dom"
const SignupForm = () => {

  const isLoading = false;

  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    console.log(values);
    
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="https://i.postimg.cc/0jPgRn3z/image.png" className="w-60"/>
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Crate a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">To use snapcart, please enter your details</p>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="h-12 bg-dark-4 border-none text-light-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-light-3"
                    {...field}
                  />

                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="h-12 bg-dark-4 border-none text-light-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-light-3"
                    {...field} />
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
                  <Input
                    type="mail" {...field}
                    className="h-12 bg-dark-4 border-none text-light-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-light-3"
                  />
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
                  <Input
                    type="password"
                    className="h-12 bg-dark-4 border-none text-light-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-light-3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-2">
            { isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ): "SignUp"}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
              Already have an account?
              <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm

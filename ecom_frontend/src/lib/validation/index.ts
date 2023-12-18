import * as z from "zod"

export const SignupValidationSchema = z.object({
    name: z.string().min(2, {message: "String must contain at least 2 character(s)"}),
    username: z.string().min(2, {message: "To Short"}),
    email: z.string().email(),
    password: z.string().min(8, {message: "Password must be at least 8 characters"}),
});
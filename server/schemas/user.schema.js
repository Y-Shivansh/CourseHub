import { email, z } from 'zod';

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.email({ message: "Invalid Email Address" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z.string().length(10),
    role: z.enum(["student", "teacher"], {
        required_error: "Role is required"
    }),
});

export const loginSchema = z.object({
    // email: z.string().email("Invalid Email Address"),
    email: z.email({ message: "Invalid Email Address" }),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export const updationSchema = z.object({
    name: z.string().optional(),
    profile: z.string().optional(),
    bio: z.string().optional(),
    phone: z.string().optional(),
    password: z.string().min(6).optional(),
    oldPassword: z.string().min(6).optional(),
});

export const deletionSchema = z.object({
    password: z.string().min(6)
});

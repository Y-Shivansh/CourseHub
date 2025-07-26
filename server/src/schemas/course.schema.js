import {z} from 'zod';

export const createCourseSchema = z.object({
    name: z.string().min(4),
    price: z.string(),
    duration: z.string(),
    description: z.string().min(30, { message: "Description must be at least 30 characters" }),
    category: z.enum(['Frontend Development', 'Backend Development', 'Full Stack Development', 'DSA', 'Business', 'Designing', 'AI/ML', 'Data Analysis', 'Marketing', 'Academic', 'JEE/NEET', 'Competitive', 'Photography']),
})

export const updateCourseSchema = z.object({
    name: z.string().min(4).optional(),
    duration: z.string().optional(),
    description: z.string().min(30).optional(),
    thumbnail: z.string().optional(),
    category: z.enum(['Frontend Development', 'Backend Development', 'Full Stack Development', 'DSA', 'Business', 'Designing', 'AI/ML', 'Data Analysis', 'Marketing', 'Academic', 'JEE/NEET', 'Competitive', 'Photography']).optional()
})
import {z} from 'zod';

export const createCourseSchema = z.object({
    name: z.string().min(4),
    duration: z.string(),
    description: z.string().min(30, { message: "Description must be at least 30 characters" }),
    category: z.enum(['Development', 'Designing', 'AI/ML', 'Data Analysis', 'Academic']),
})

export const updateCourseSchema = z.object({
    name: z.string().min(4).optional(),
    duration: z.string().min(30).optional(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    category: z.enum(['Development', 'Designing', 'AI/ML', 'Data Analysis', 'Academic']).optional()
})
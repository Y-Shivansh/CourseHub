import {z} from 'zod';

export const createCourseSchema = z.object({
    name: z.string().min(4),
    duration: z.string(),
    description: z.string().min(30, { message: "Description must be at least 30 characters" }),
    category: z.enum(['Development', 'Designing', 'AI/ML', 'Data Analysis', 'Academic']),
})
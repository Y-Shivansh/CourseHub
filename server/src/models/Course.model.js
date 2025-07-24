import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minLength: 30,
        },
        price:{
            type: String,
            required: true
        },
        category: {
            type: String,
            enum: ['Frontend Development', 'Backend Development', 'Full Stack Development', 'DSA', 'Business', 'Designing', 'AI/ML', 'Data Analysis', 'Marketing', 'Academic', 'JEE/NEET', 'Competitive', 'Photography'],
            required: true,
        },
        thumbnail:{
            type: String, 
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        enrolledStudents: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
            default: [],
        },
    }
)

const Course = mongoose.model('Course', courseSchema);
export default Course;
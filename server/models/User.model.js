import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        profile: {
            type: String,
        },
        bio: {
            type: String,
        },
        age: {
            type: Number,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
            select: false // MongoDB will not send password, unless explicitly asked. 
            /* const user = await user.findById({userId}).select("+password") */ // like this.
        },
        phone: {
            type: String,
            unique: true,
        },
        role: {
            type: String,
            enum: ['student', 'teacher'],
            default: 'student',
        },

        // enrolled in (For Students) an array, as students may enroll in multiple courses.
        enrolledIn: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Course',
            default: [],
        },

        // courseCreated (For Teachers)
        courseCreated: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Course',
            default: []
        },
    },
    {
        timestamps: true,
    },
)

const User = mongoose.model("User", userSchema);
export default User;
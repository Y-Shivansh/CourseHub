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
            required: function () {
                return this.authProvider === 'local';  // required is true for local users not for Oauth
            },
            select: false // MongoDB will not send password, unless explicitly asked. 
        },
        phone: {
            type: String,
            unique: true,
            sparse: true, // allows null for google users.
        },
        role: {
            type: String,
            enum: ['student', 'teacher'],
            default: 'student',
        },

        // OAuth related addons. 
        authProvider: {  // defines if local user or OAuth user.
            type: String,
            enum: ['local', 'google'],
            default: 'local',
        },
        authId:{
            type: String,
            unique: true,
            sparse: true, // allows null for local users.
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
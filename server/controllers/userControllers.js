import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";

import User from '../models/user.model.js';
import DeletionLog from "../models/DeletionLog.js"
import { registerSchema, loginSchema, updationSchema, deletionSchema } from '../schemas/user.schema.js';
import { sendEmail } from '../utils/sendEmail.js';


export const registerUser = async (req, res) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed", errors: result.error });
    }
    const validatedData = result.data;
    const { name, email, password, phone, role } = validatedData;

    try {
        let user = await User.findOne({
            $or: [{ email }, { phone }],
        });

        if (user) {
            const errorField = user.email === email ? "Email" : "Phone";
            return res.status(400).json({ msg: `${errorField} already in use` })
        }
        user = new User({
            name, email, password, phone, role,
            profile: req.body.profile || "", // Optional
            bio: req.body.bio || "",         // Optional
        })

        // Hashing Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = generateToken(user._id, role);
        res.status(201).json({
            message: "User Registered Successfully",
            token
        })

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error");
    }
};


export const loginUser = async (req, res) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed", error: result.error });
    }
    const { email, password } = result.data;
    try {
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        // Password Check:
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
            const token = generateToken(user._id, user.role);

            return res.status(200).json({
                message: "Signin successful.",
                token,
                // user: {
                //     id: user._id,
                //     name: user.name,
                //     email: user.email,
                //     role: user.role
                // }
                // commenting this, because after login /me will be called and wha pr se user return hona hi hai.
            })
        }
        res.status(401).json({
            message: "Wrong Password or Email."
        })
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
};


export const getUserProfile = async (req, res) => {
    const { userId, role } = req.user;
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.error("Can not fetch user details");
            return res.status(403).json({ message: "User not Found" });
        }
        const { name, profile, bio, age, email, phone, enrolledIn, courseCreated } = user;
        return res.status(200).json({
            message: "Details Fetched.",
            user
        })
    } catch (error) {
        console.error("Get User Profile Error", error.message);
        return res.status(500).json({
            message: "Server Error"
        })
    }
};


export const updateUser = async (req, res) => {
    const result = updationSchema.safeParse(req.body);
    if (!result.success) return res.status(400).json({ message: "Validation Failed" });
    const { name, profile, bio, phone, oldPassword, password } = result.data;
    try {
        const user = await User.findById(req.user.userId).select("+password");
        if (!user) {
            console.error("Can not update user details");
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name?.trim() || user.name; // If name is not undefined or null, then run .trim() on it (safe optional chaining)
        user.profile = profile?.trim() || user.profile;
        user.bio = bio?.trim() || user.bio;
        user.phone = phone?.trim() || user.phone;

        if (password) {
            if (!oldPassword) {
                return res.status(400).json({ message: "Old password required to update password" });
            }
            if (oldPassword === password) {
                return res.status(400).json({ message: "Both passwords must be different" });
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Old password is incorrect" });
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt)
        }
        await user.save();

        return res.status(200).json({
            message: "User data updated.",
            user: {
                name: user.name,
                profile: user.profile,
                bio: user.bio,
                phone: user.phone,
                role: user.role
            }
        })


    } catch (error) {
        console.error("Updation Error", error);
        return res.status(500).json({
            message: "Server Error",
            error
        })
    }
};


export const deleteUser = async (req, res) => {
    const result = deletionSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed" })
    }
    const password = req.body?.password;
    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    const userId = req.user.userId;
    try {
        const user = await User.findById(userId).select("+password");
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            console.error("Delete User Failed.")
            return res.status(401).json({ message: "Incorrect Password" });
        }
        // Creating Deletion Log
        await DeletionLog.create({
            userId: user._id,
            email: user.email,
        })

        // Use at the time of actual email addresses in the DB.
        try {
            const mailSent = await sendEmail({
                to: user.email,
                subject: "Account Deleted",
                html: `<h1>Hello ${user.name}</h1> <p> your account was deleted from CourseHub.</p>`
            })
            if (mailSent) console.log(`Mail Sent to ${user.email}`);
        } catch (err) {
            console.error("An Error Occurred, while sending mail.", err);
        }

        await user.deleteOne();

        return res.status(200).json("User deleted.")
    } catch (error) {
        console.error("Delete User Error");
        return res.status(500).json({
            message: "Server Error",
            error: error
        })
    }
};
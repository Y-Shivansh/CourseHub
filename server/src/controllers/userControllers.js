import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";
import User from '../models/User.model.js';
import DeletionLog from "../models/DeletionLog.js"
import { registerSchema, loginSchema, updationSchema, deletionSchema, oauthRegisterSchema } from '../schemas/user.schema.js';
import { sendEmail } from '../utils/sendEmail.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import fs from 'fs'


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
            return res.status(400).json({ message: `${errorField} already in use` })
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
    const { name, bio, phone, oldPassword, password } = result.data;
    try {
        const user = await User.findById(req.user.userId).select("+password");
        if (!user) {
            console.error("Can not update user details");
            return res.status(404).json({ message: "User not found" });
        }

        user.name = name?.trim() || user.name; // If name is not undefined or null, then run .trim() on it (safe optional chaining)
        user.bio = bio?.trim() || user.bio;
        user.phone = phone?.trim() || user.phone;

        // *Upload profile picture if exists*
        if (req.file) {
            const localFilePath = req.file.path;
            const cloudinaryRes = await uploadOnCloudinary(localFilePath);

            if (fs.existsSync(localFilePath)) {
                fs.unlinkSync(localFilePath); // delete locally save file
            }

            if (!cloudinaryRes) {
                return res.status(500).json({ message: "Cloudinary upload failed" });
            }

            user.profile = cloudinaryRes.secure_url;
        }

        // Password Update
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
    const password = req.body?.password;
    const userId = req.user.userId;

    try {
        const user = await User.findById(userId).select("+password");

        if (user.password) {
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: "Incorrect Password" });
            }
        }

        // For OAuth user — skipping password validation
        // No extra handling needed here

        // Deletion Log
        await DeletionLog.create({
            userId: user._id,
            email: user.email,
        })

       // email confirmation
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

// OAuth Controller:
export const registerOauthUser = async (req, res) => {
    const { email } = req.body;
    let existingUser = await User.findOne({ email });
    if (existingUser) {
        const token = generateToken(existingUser._id, existingUser.role);
        return res.status(200).json({
            message: "User already exists, login successful.",
            token
        });
    }
    console.log("Trying New");
    
    const result = oauthRegisterSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed", errors: result.error })
    }

    const { name, role, profile, authId } = result.data;
    try {
        const user = new User({
            name, email, role, authId,
            authProvider: 'google',
            profile: profile || ""
        })

        await user.save();

        // generateToken
        const token = generateToken(user._id, user.role);
        return res.status(201).json({
            message: "OAuth user registered successfully.",
            token
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Server Error", error.message);
    }
}
import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.model.js";

export const registerUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exist." })
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


export const loginUser = () => {

};


export const getUserProfile = () => {

};


export const updateUser = () => {

};


export const deleteUser = () => {

};
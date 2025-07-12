import bcrypt from 'bcrypt';
import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.model.js";
import { registerSchema, loginSchema } from '../schemas/user.schema.js';


export const registerUser = async (req, res) => {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ message: "Validation Failed", errors: result.error.errors });
    }
    const validatedData = result.data;
    const { name, email, password, phone, role } = validatedData;

    try {
        let user = await User.findOne({
            $or: [{ email }, { phone }]
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
    const{email, password} = result.data;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        // Password Check:
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(isValidPassword){
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
        console.error("Login error:", error.message);
        res.status(500).json({
            message: "Server Error"
        })
    }
};


export const getUserProfile = () => {

};


export const updateUser = () => {

};


export const deleteUser = () => {

};
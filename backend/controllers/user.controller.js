import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { generateToken } from '../jwt/token.js'
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const schema = z.object({
            username: z.string().min(3, { message: "Not Long Enough" }).max(50),
            email: z.string().email({ message: "Invalid email" }),
            password: z.string().min(6, { message: "Not Long Enough" }).max(50),
        });

        if (!email || !username || !password) {
            return res.status(400).json({ errors: "All Fields are required" });
        }
        const validate = schema.safeParse({ username, email, password });
        if (!validate.success) {
            const errorMessages = validate.error.errors.map((err) => err.message)
            return res.status(400).json({ errors: errorMessages });
        }
        const userExists = await User.findOne({ email: email });
        // console.log(userExists)
        if (userExists) return res.status(400).json({ msg: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name: username, email, password: hashedPassword });
        await newUser.save();
        if (newUser) {
            const token = await generateToken(newUser._id, res);
            return res.status(200).json({ message: "User created successfully", newUser, token });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
};
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ errors: "All Fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ errors: "Invalid Credentials" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ errors: "Invalid Credentials" });
        const token = await generateToken(user._id, res);
        return res.status(200).json({ message: "User logged in successfully", user, token });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("error in logging in");
    }
}
export const logoutUser = async (req, res) => {
    try {
        await res.clearCookie("jwt", {
            path: "/"
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("error in logging out");
    }
}

export default {}



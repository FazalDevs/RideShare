import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authenticate = async (req, res, next) => {
    // Expect header: Authorization: Bearer <token>
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // take the part after "Bearer"

    if (!token) {
        return res.status(401).json({ message: "You are not authenticated" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id).select("-password"); // optional: exclude password
        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error(error.message);
        res.status(403).json({ message: "Token is invalid or expired" });
    }
};

export default {};

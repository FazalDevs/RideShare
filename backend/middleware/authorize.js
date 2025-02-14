import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const authenticate = async (req, res, next) => {
    // console.log(req.cookies);
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "You are not authenticated" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log(decoded.id)
        req.user = await User.findById(decoded.id);
        if (!req.user) return res.status(401).json({ message: "User not found" });
        next();
    } catch (error) {
        console.error(error.message);
        res.status(403).json({ message: "Token is invalid" });
    }
}
export default {};
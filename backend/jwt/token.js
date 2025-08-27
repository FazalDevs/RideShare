import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const generateToken = async (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        path: '/',
    });
    // console.log(token)
    console.log("Cookie set:", res.getHeaders()['set-cookie']);
    await User.findByIdAndUpdate(id, { token });
    return token;
}
export default {};
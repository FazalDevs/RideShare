import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const generateToken = async (id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '10h' });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        path: "/"
    });
    // console.log(token)
    await User.findByIdAndUpdate(id, { token });
    return token;
}
export default {};
import jwt from 'jsonwebtoken'
export const generateToken = (userId) => {
    const SECRET_KEY = process.env.JWT_SECRET;
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
    return token;
}
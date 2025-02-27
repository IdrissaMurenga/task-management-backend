import jwt from 'jsonwebtoken'
export const generateToken = (userId) => {
    const SECRET_KEY = process.env.JWT_SECRET;

    // Create a new token with the user's ID and a 1-hour expiration time
    const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });

    // Return the token to the user
    return token;
}
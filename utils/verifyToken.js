import jwt from 'jsonwebtoken'
import User from '../db/models/userModel.js'

export const context = async ({ req }) => {
        const SECRET_KEY = process.env.JWT_SECRET;

        if (!SECRET_KEY) {
            console.error('Missing JWT_SECRET in environment variables');
            return {};
        }

        const token = req?.headers?.authorization?.split('Bearer ')[1];

        if (!token) return {};

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            const user = await User.findById(decoded?.id);
            return { user };
        } catch (error) {
            console.error('TOKEN_VERIFICATION_ERROR:', error.message);
            return {};
        }
}
import jwt from 'jsonwebtoken'
import User from '../db/models/userModel.js'

export const context = async ({ req }) => {
    // retrive the secret key in environment variables
    const SECRET_KEY = process.env.JWT_SECRET;

    // check if there is a secret key in environment variables
    if (!SECRET_KEY) {
        // if there is no secret key, log an error and return an empty context object
        console.error('Missing JWT_SECRET in environment variables');

        return {};
    }

    // check if there is a token in the request headers
    const token = req?.headers?.authorization?.split('Bearer ')[1];

    // if there is no token, return an empty context object
    if (!token) return {};

    try {
        // verify token and return the user object
        const decoded = jwt.verify(token, SECRET_KEY);
        
        // find the user in the database by the id in the token
        const user = await User.findById(decoded?.id);
        
        // if the user is found, return the user object
        return { user };

    } catch (error) {
        // if the token is invalid, log the error and return an empty context object
        console.error('TOKEN_VERIFICATION_ERROR:', error.message);
        return {};
    }
}
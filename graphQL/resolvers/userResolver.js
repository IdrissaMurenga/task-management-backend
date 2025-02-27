import bcrypt from "bcryptjs";
import User from "../../db/models/userModel.js";
import { GraphQLError } from "graphql";
import { generateToken } from "../../utils/generateToken.js";


export default {
    Query: {
        user: async (_, __, context) => {
            // Check if user is authenticated.
            if (!context?.user) {
                throw new GraphQLError("user not authenticated.")
            }
            if (!context?.user?.email) {
                throw new GraphQLError("user authentication failed")
            }
            
            try {
                // Find the user in database using their email.
                const user = await User.findOne({email: context.user.email})
                
                // If user not found, throw an error.
                if (!user) {
                    throw new GraphQLError("User not found")
                }
                return {
                    firstName: user.firstName,
                    lastName: user.lastName,
                }
            } catch (error) {
                throw new GraphQLError(`Error fetching user: ${error.message}`)
            }
        }
    },
    Mutation: {
        signup: async (_, { input }) => {
            const { firstName, lastName, email, password } = input
            
            // Check if all required fields are provided.
            if (!firstName || !lastName || !email || !password) {
                throw new GraphQLError("All fields are required.")
            }

            try {
                // Check if email already exists.
                const existingUser = await User.findOne({ email })

                // If user exists, throw an error.
                if (existingUser) {
                    throw new GraphQLError("Email already exist.")
                }
                
                // Hash the password using bcryptjs.
                const hashedPassword = await bcrypt.hash(password, 10)
                
                // Create a new user with the hashed password.
                const user = new User({ firstName, lastName, email, password: hashedPassword })
                
                // Save the user to the database.
                await user.save()
                
                // Generate a JWT token for the authenticated user.
                const token = generateToken(user._id)

                // Return the user and the JWT token.
                return {
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email:user.email,
                    },
                    token
                }

            } catch (error) {
                throw new GraphQLError(`Error creating user: ${error.message}`, {
                    extensions: { code: "INTERNAL_SERVER_ERROR" }
                });
            }
        },
        login: async (_, { input }) => {
            const { email, password } = input

            // Check if all required fields are provided.
            if (!email ||!password) {
                throw new GraphQLError("All fields are required.")
            }

            try {
                // Find the user by email.
                const user = await User.findOne({ email })
                
                // If user not found, throw an error.
                if (!user) {
                    throw new GraphQLError("User not found.")
                }
                
                // Compare the hashed password with the provided password.
                const isMatch = await bcrypt.compare(password, user.password)
                
                // If password does not match, throw an error.
                if (!isMatch) {
                    throw new GraphQLError("Invalid password.")
                }
                
                // Generate a JWT token for the authenticated user.
                const token = generateToken(user._id)
                
                // Return the JWT token.
                return { token }

            } catch (error) {
                throw new GraphQLError(`Error logging in: ${error.message}`, {
                    extensions: { code: "INTERNAL_SERVER_ERROR" }
                });
            }

        }
    }
}
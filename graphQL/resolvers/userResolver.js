import bcrypt from "bcryptjs";
import User from "../../db/models/userModel.js";
import { GraphQLError } from "graphql";
import { generateToken } from "../../utils/generateToken.js";


export default {
    Query: {
        user: async (_, { email }, context) => {
            if (!context.user) {
                throw new GraphQLError("user not authenticated.")
            }
            
            try {                
                const user = await User.findOne({email})
                if (!user) {
                    throw new GraphQLError("User not found")
                }
                return {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                }
            } catch (error) {
                throw new GraphQLError(`Error fetching user: ${error.message}`)
            }
        }
    },
    Mutation: {
        signup: async (_, { input }) => {
            const { firstName, lastName, email, password } = input

            if (!firstName || !lastName || !email || !password) {
                throw new GraphQLError("All fields are required.")
            }
            const existingUser = await User.findOne({ email })
            if (existingUser) {
                throw new GraphQLError("Email already in use.")
            }
            const genSalt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, genSalt)
            const user = new User({ firstName, lastName, email, password: hashedPassword })
            await user.save()
            const token = generateToken(user._id)

            return {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email:user.email,
                },
                token
            }
        },
        login: async (_, { input }) => {
            const { email, password } = input
            if (!email ||!password) {
                throw new GraphQLError("All fields are required.")
            }
            const user = await User.findOne({ email })
            if (!user) {
                throw new GraphQLError("User not found.")
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                throw new GraphQLError("Invalid password.")
            }
            const token = generateToken(user._id)
            return { token }
        }
    }
}
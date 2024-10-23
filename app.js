import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import { createYoga } from "graphql-yoga";
import { createSchema } from "graphql-yoga";
import { typeDefs } from "./graphql/types/index.js";
import { todoResolvers } from "./graphql/resolvers/index.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const yoga = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers: todoResolvers
    }),
})

app.use('/graphql', yoga)

// Connect to MongoDB
const MONGODB = process.env.MONGO_URL
mongoose.connect(MONGODB)
    .then(() => {
        const port = process.env.PORT
        app.listen(port, () => console.log(`Server running on port ${port}.....`));
    })
    .catch((err) => console.log(err.message)) 
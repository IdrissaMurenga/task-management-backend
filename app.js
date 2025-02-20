import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { context } from './utils/verifyToken.js';
import { typeDefs } from './graphQL/types/index.js';
import { createYoga, createSchema } from 'graphql-yoga';
import { resolvers } from './graphQL/resolvers/index.js';
import { mongoDBconnect } from './db/mongoConnection/mongodb.js';


// Load environment variables from .env file
dotenv.config();

// start server
const app = express();

// GraphQL endpoint
const yoga = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers
    }),
    context
})

//Middlewares
app.use(cors())
app.use('/graphql', yoga)

mongoDBconnect(app)
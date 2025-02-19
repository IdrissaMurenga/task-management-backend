import express from 'express';
import dotenv from 'dotenv'
import { mongoDBconnect } from './db/mongoConnection/mongodb.js';
import { createYoga, createSchema } from 'graphql-yoga';


// Load environment variables from .env file
dotenv.config()

// start server
const app = express();



mongoDBconnect(app)
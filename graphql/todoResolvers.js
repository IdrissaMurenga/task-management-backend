import mongoose from "mongoose";
import Tasks from "../models/todoModels.js";
import { ApolloError } from 'apollo-server-errors';
const resolvers = {
    Query: {
        // getting all tasks
        tasks: async () => {
            try {
                const tasks = await Tasks.find({})
                return tasks
            } catch (error) {
                throw new ApolloError("Failed to fetch tasks", "TASK_FETCH_FAILED", { error });
            }
        }
    },
    Mutation: {
        // create a new task
        addTask: async (_, { input }) => {
            const { text, completed } = input;
            if (!text) throw new ApolloError("Please provide a task text.", "TASK_TEXT_REQUIRED");
            try {
                const newTask = await Tasks.create({
                    text,
                    completed,
                })
                return newTask
            } catch (err) {
                throw new ApolloError("Failed to create task", "TASK_CREATION_FAILED", { err });
            }
        },

        // update a task
        updateTask: async (_, { id, input }) => {
            const { text, completed } = input
            try {        
                if (!mongoose.Types.ObjectId.isValid(id)) throw new ApolloError("Task not found.", "INVALID_TASK_ID");;
            
                const updateTask = await Tasks.findByIdAndUpdate({ _id: id }, { text, completed }, {new: true});
            
                if (!updateTask) throw new ApolloError("Task not found.", "TASK_NOT_FOUND");
            
                return updateTask;

            } catch (err) {
                throw new ApolloError("Failed to update task", "TASK_UPDATE_FAILED", { err });
            }
        },
        
        // delete a task
        deleteTask: async (_, { id }) => {
            try {
                if (!mongoose.Types.ObjectId.isValid(id)) throw new ApolloError("Task not found.", "INVALID_TASK_ID");;

                const deletedTask = await Tasks.findByIdAndDelete(id);

                if (!deletedTask) throw new ApolloError("Task not found.", "TASK_NOT_FOUND");

                return deletedTask
            } catch (err) {
                throw new ApolloError("Failed to delete task", "TASK_DELETION_FAILED", { err });
            }
        }
    }
};

export default resolvers
import userResolver from "./userResolver.js";
import expenseResolver from "./expenseResolver.js";


export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...expenseResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...expenseResolver.Mutation
    }
}
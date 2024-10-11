const typeDefs = `
    type Tasks {
        id: ID!
        text: String!
        completed: Boolean
    }
    type Query {
        tasks: [Tasks!]!
    }
    input AddTaskInput {
        text: String!
        completed: Boolean
        createdAt: String
    }
    input UpdateTaskInput {
        text: String
        completed: Boolean
    }
    type Mutation {
        addTask(input: AddTaskInput!): Tasks
        updateTask(id: ID!, input: UpdateTaskInput!): Tasks
        deleteTask(id: ID!): Tasks
    }
`;

export default typeDefs
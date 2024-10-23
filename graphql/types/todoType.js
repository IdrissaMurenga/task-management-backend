const todoType = `
    type Tasks {
        id: ID!
        text: String!
        completed: Boolean
        createdAt: String
        updatedAt: String
    }
    type Query {
        tasks: [Tasks!]!
    }
    input AddTaskInput {
        text: String!
        completed: Boolean
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
    type Subscription {
        addedTask: Tasks!
        updatedTask: Tasks!
        deletedTask: Tasks!
    }
`;

export default todoType
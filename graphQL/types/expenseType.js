export const expenseType = `
    type Expense {
        id: ID!
        userId: ID!
        amount: Float!
        categories: String!
        createdAt: String
    }
    type Query {
        expenses: [Expense]
    }
    type Mutation {
        addExpense(input: ExpenseInput!): Expense
        updateExpense(id: ID!, input: ExpenseInput!): Expense
        deleteExpense(id: ID!): Boolean
    }
    input ExpenseInput {
        amount: Float!
        categories: String!
    }

`
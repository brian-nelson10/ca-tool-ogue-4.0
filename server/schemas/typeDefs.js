const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    toolCount: Int
    savedTools: [ToolList]
}

type Query{
    me: User
    users: [User]
    user(username: String!): User
    tool(_id: ID!): Tool
}

type Tool {
    _id: ID
    toolId: String!
    toolName: String
    createdAt: String
    checkedInBy: [User]
    notes: [Note]
}

type Note{
    _id: ID
    noteBody: String
    createdAt: String
    username: String
}

type Auth{
    token: ID!
    user: User
}

input savedTool {
    _id: ID
    toolName: String
    createdAt: String
    checkedInBy: [User]
    
}

type Mutation{
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveTool(input: savedTool!): User
    removeTool(toolId: String!): User
    addNote(toolId: ID!, noteBody: String!): Tool
    checkedInBy(toolId: ID!, username: String!): Tool
    createTool(toolName: String!, username: String! ): User
}
`;

module.exports = typeDefs;
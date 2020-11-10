const {buildSchema} = require('graphql');
module.exports = buildSchema(`

type Event {
    _id: ID!
    title: String!
    description: String!
    start: String!
    end: String!
    creator: User!
    shareHolders: [User!]!
}

type User {
    _id: ID,
    email: String!
    password: String
    createdEvents: [Event!]!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {
    title: String!
    description: String!
    start: String!
    end: String!
}

input UserInput {
    email: String!
    password: String!
}

input AddShareHoldersInput{
    userId: ID!
    eventId: ID!
}

type RootQuery {
    events: [Event!]!
    userEvents(userId: ID!): [Event!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    addShareHolders(addShareHoldersInput: AddShareHoldersInput):Event
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
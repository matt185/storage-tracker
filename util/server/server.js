const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors')
const typeDefs = require('./graphqlSettings/schema/typeDefs')
const resolvers = require('./graphqlSettings/resolver/resolver')

const app = express()

app.use(cors())

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.applyMiddleware({ app, path: '/graphql' })

module.exports = app;
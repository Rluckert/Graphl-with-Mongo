const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//const { graphqlExpress, graphiqlExpress } = require('graphql-server-express');
const { ApolloServer } = require('apollo-server-express');
/* const { makeExecutableSchema } = require('graphql-tools'); */

const { merge } = require('lodash');

const courseTypeDefs = require('./types/course.types');
const courseResolvers = require('./resolvers/course.resolvers');

const userTypeDefs = require('./types/user.types');
const userResolvers = require('./resolvers/user.resolvers');

const authFunc = require('./libs/auth');

mongoose.connect('mongodb://localhost:27017/graphql_db', { useNewUrlParser: true })

const app = express();

const typeDefs = `
 type Alert{
     message: String
 }
 
 type Query {
     _ : Boolean
 }

 type Mutation {
     _ : Boolean
 }
 `;

const resolver = {};

/* const schema = makeExecutableSchema({
    typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
    resolvers : merge(resolver, courseResolvers, userResolvers)
}) */

/* app.use('/graphql',bodyParser.json(), graphqlExpress({ schema: schema }))
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' })); */

const server = new ApolloServer({
    typeDefs: [typeDefs, courseTypeDefs, userTypeDefs],
    resolvers : merge(resolver, courseResolvers, userResolvers),
    context: authFunc
});

server.applyMiddleware({app: app});


app.listen(8080, () => console.log("Servidor corriendo..."));
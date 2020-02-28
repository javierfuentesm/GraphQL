"use strict";
const { graphql, buildSchema } = require("graphql");
const express= require('express')
const gqlMiddleware = require('express-graphql')

const app = express()
const port = process.env.port || 3000
const schema = buildSchema(`type Query {
    hello: String,
}`);
//Configurar resolvers

const resolvers = {
  hello: () => "Hola Mundo",
};


app.use('/api',gqlMiddleware({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))
app.listen(port,()=>{
    console.log(`Server is listening at port http://localhost:${port}/api`)
})
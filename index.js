"use strict";
const { graphql, buildSchema } = require("graphql");
const schema = buildSchema(`type Query {
    hello: String,
    saludo: String,
}`);
//Configurar resolvers

const resolvers = {
  hello: () => "Hola Mundo",
  saludo: () => "Que onda hommie"
};

//Ejecutar el query hello
graphql(schema, "{saludo}", resolvers).then(data => {
  console.log(data);
});

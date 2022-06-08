import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers.js";
import { typeDefs } from "./typeDefs.js";

const startServer = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb+srv://eitan:1Ioet23!@cluster0.dfwqi.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();

// require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoUrl = process.env.MONGO_URI;

const resolvers = require("./graphql");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();
const typeDefs = require("./graphql/typeDefs");
mongoose
  .connect(mongoUrl)
  .then(console.log(`mongoose connected succesfully`))
  .catch((error) => next(error));

// app.use(cors({ Origin: 'https://studio.apollographql.com', Credentials: true }))
app.use(cors(corsOptions));
// app.use(cookieParser())

//should be last
app.use(errorMiddleware);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    return {
      req,
      res,
    };
  },
});

server.listen(process.env.PORT || 4000).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

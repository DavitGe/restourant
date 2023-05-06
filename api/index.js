// require("dotenv").config();
const app = express();

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
});

const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const mongoUrl = process.env.MONGO_URI;

const resolvers = require("./graphql");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/error-middleware");

const typeDefs = require("./graphql/typeDefs");
mongoose
  .connect(mongoUrl)
  .then(console.log(`mongoose connected succesfully`))
  .catch((error) => next(error));

// app.use(cors({ Origin: 'https://studio.apollographql.com', Credentials: true }))
app.use(cors({ Origin: "http://localhost:3000/" }));
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

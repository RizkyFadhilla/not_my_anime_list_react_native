if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT || 4000;

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { userTypeDefs, userResolvers } = require("./schema/User");
const { AppTypeDefs, AppResolvers } = require("./schema/data.");

const server = new ApolloServer({
  typeDefs: [userTypeDefs, AppTypeDefs],
  resolvers: [userResolvers, AppResolvers],
  introspection: true,
});
startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});

const axios = require("axios");
const redis = require("../config/redis");
const { baseUserUrl } = require("../url");

const userTypeDefs = `#graphql
    type User {
    _id: ID,
    username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    Address: String
  }
  type Query {
    getAllUser:[User]
    getOneUser(_id:ID!):User
  }
  type Mutation {
    createUser(username: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    Address: String): User

    deleteUser(_id:ID!): User
    }
    
  `;

const userResolvers = {
  Query: {
    getAllUser: async () => {
      try {
        const allUser = await redis.get("user-mongodb:allUser");
        console.log(allUser);
        if (allUser) {
          const data = JSON.parse(allUser);
          console.log("ini di redis");
          return data;
        } else {
          const { data } = await axios.get(baseUserUrl);
          console.log("ini dari else");
          await redis.set("user-mongodb:allUser", JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    getOneUser: async (parent, args) => {
      try {
        const OneUser = await redis.get(`user-mongodb:OneUser/${args._id}`);
        if (OneUser) {
          const data = JSON.parse(OneUser);
          console.log("ini di redis");
          return data;
        } else {
          const { data } = await axios.get(baseUserUrl + `/${args._id}`);
          console.log("ini dari else");
          await redis.set(`user-mongodb:OneUser/${args._id}`, JSON.stringify(data));
          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const { data } = await axios.post(baseUserUrl, args);
        await redis.del("user-mongodb:allUser");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteUser: async (parent, args) => {
      try {
        const { data } = await axios.delete(baseUserUrl + `/${args._id}`);
        await redis.del("user-mongodb:allUser");
        await redis.del(`user-mongodb:OneUser/${args._id}`);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

module.exports = {
  userTypeDefs,
  userResolvers,
};

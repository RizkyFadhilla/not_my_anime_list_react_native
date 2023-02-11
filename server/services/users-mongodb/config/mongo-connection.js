const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);  

// Database Name
const dbName = "p3_c1_NotMyAnimeList";
let db;

async function connect() {
  try {
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    db = client.db(dbName);
  } catch (error) {
    console.log(error);
  }
}

function getDB() {
  return db;
}

module.exports = {
  getDB,
  connect,
};

const Redis = require("ioredis");
const redis = new Redis({
    port: 16074, // Redis port
  host: "redis-16074.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  username: "default", // needs Redis >= 6
  password: "10CGGjFwWNTkpCWaxga4pSHnrQIuKss5",
  db: 0, // Defaults to 0
});

module.exports = redis
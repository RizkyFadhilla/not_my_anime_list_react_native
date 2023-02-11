const bcrypt = require("bcryptjs");

let hashPassword = (password) => bcrypt.hashSync(password);
let comparePassword = (pass, hashPass) => bcrypt.compareSync(pass, hashPass);

module.exports = {
  hashPassword,
  comparePassword,
};

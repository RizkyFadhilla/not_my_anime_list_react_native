const bcrypt = require("bcryptjs");

const hashPassword = (password) => bcrypt.hashSync(password);
const comparePassword = (pass, hashPass) => bcrypt.compareSync(pass, hashPass);

module.exports = {
  hashPassword,
  comparePassword,
};

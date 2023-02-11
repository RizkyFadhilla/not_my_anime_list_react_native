const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcryptjs");

class UserDB {
  static invokeDB() {
    let db = getDB();
    return db.collection("User");
  }

  static getData() {
    return this.invokeDB().find().toArray();
  }
  static getDataById(id) {
    return this.invokeDB().findOne({ _id: ObjectId(id) });
  }
  static addUserBy(username, email, password, role, phoneNumber, Address) {
    return this.invokeDB().insertOne({
      username,
      email,
      password: hashPassword(password),
      role,
      phoneNumber,
      Address,
    });
  }
  static deleteUserInDb(id) {
    return this.invokeDB().deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = UserDB;

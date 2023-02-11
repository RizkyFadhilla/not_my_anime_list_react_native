async function Authorization(req, res, next) {
  try {
    let { role } = req.user;
    if (role !== "superAdmin") {
      throw { name: "You Don't Have Authorize" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
module.exports = Authorization;

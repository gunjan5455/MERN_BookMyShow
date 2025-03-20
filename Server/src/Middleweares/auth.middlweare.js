const jwt = require("jsonwebtoken");
const userModel = require("../Models/auth.models");
const verifyToken = (req, res, next) => {
  const tokenString = req.headers["x-access-token"];
  console.log(tokenString);
  if (!tokenString) {
    return res.status(403).send({ message: "User unauthorized" });
  }
  const token = tokenString.split(" ")[1];
  console.log(token);

  jwt.verify(token, process.env.SECRET, async (err, payload) => {
    if (err) {
      return res.status(403).send({ message: "Invalid token" });
    }
    console.log("payload", payload);
    const userId = payload.userId;
    try {
      const user = await userModel.findById(userId);
      req.userDetails = user;
    } catch (err) {}
    next();
  });
};
const verifyAdmin = (req, res, next) => {
  const role = req.userDetails.role;
  if (role != "admin") {
    return res
      .status(403)
      .send({ message: "You are unauthorised to perform this operation" });
  }
  next();
};

const verifyAdminorPartner = (req, res, next) => {
  const role = req.userDetails.role;
  if (role != "admin" && role != "partner") {
    return res
      .status(403)
      .send({ message: "You are unauthorised to perform this operation" });
  }
  next();
};
module.exports = {
  verifyToken,
  verifyAdmin,
  verifyAdminorPartner,
};

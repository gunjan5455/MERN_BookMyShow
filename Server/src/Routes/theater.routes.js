const {
  createTheaters,
  getTheaters,
} = require("../Controllers/theater.controllers");
const {
  verifyToken,
  verifyAdminorPartner,
} = require("../Middleweares/auth.middlweare");

module.exports = (app) => {
  app.post("/theaters", [verifyToken, verifyAdminorPartner], createTheaters);
  app.get("/theaters", [verifyToken], getTheaters);
};

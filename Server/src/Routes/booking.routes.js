const {
  makePayment,
  creareBooking,
} = require("../Controllers/bookig.controller");
const { verifyToken } = require("../Middleweares/auth.middlweare");

module.exports = (app) => {
  app.post("/payment/", [verifyToken], makePayment);
  app.post("/booking", [verifyToken, creareBooking]);
};

const {
  createShows,
  getAllShows,
  getTheaterandShowByMoviId,
  getShowById,
} = require("../Controllers/shows.controller");
const {
  verifyToken,
  verifyAdminorPartner,
} = require("../Middleweares/auth.middlweare");

module.exports = (app) => {
  app.post("/shows", [verifyToken, verifyAdminorPartner], createShows);
  app.get("/shows", [verifyToken], getAllShows);
  app.get("/movies/:movieId/shows", [verifyToken], getTheaterandShowByMoviId);
  app.get("/shows/:id", [verifyToken], getShowById);
};

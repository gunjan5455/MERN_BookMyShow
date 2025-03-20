const {
  getAllMovies,
  createNewMovie,
  getMoviesById,
  updateMovieById,
  deleteMovieById,
} = require("../Controllers/movies.controllers");
const { verifyToken, verifyAdmin } = require("../Middleweares/auth.middlweare");

module.exports = (app) => {
  app.get("/movies", [verifyToken], getAllMovies);
  app.get("/movies/:id", [verifyToken], getMoviesById);
  app.post("/movies", [verifyToken, verifyAdmin], createNewMovie);
  app.put("/movies/:id", [verifyToken, verifyAdmin], updateMovieById);
  app.delete("/movies/:id", [verifyToken, verifyAdmin], deleteMovieById);
};

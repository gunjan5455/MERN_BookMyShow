const { default: mongoose } = require("mongoose");
const MovieModel = require("../Models/movies.models");

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModel.find({});
    return res.status(200).send(allMovies);
  } catch (err) {
    return res.status(500).send({ message: "Internal Error" });
  }
};
const getMoviesById = async (req, res) => {
  try {
    const Movie = await MovieModel.findById(req.params.id);
    return res.status(200).send({
      success: true,
      message: "movies have been fetched",
      data: Movie,
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal Error" });
  }
};
const createNewMovie = async (req, res) => {
  try {
    const newMovie = new MovieModel(req.body);
    const dbres = await newMovie.save();

    if (dbres != null) {
      return res.status(201).send({
        success: true,
        message: "New Movie has been successfully added",
      });
    } else {
      return res.status(401).send({
        success: false,
        message: "Retry!",
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal error" });
  }
};
const updateMovieById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({
        success: false,
        message: `this id: ${req.params.id} is invalid `,
      });
    }
    const movie = await MovieModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).send({
        success: false,
        message: `this movie with id: ${req.params.id} is not found `,
      });
    }
    const updateMovie = await MovieModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updateMovie != null) {
      return res.status(404).send({
        success: true,
        message: `this movie with id: ${req.params.id} is successfully updated `,
        data: updateMovie,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal error" });
  }
};
const deleteMovieById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).send({
        success: false,
        message: `this id: ${req.params.id} is invalid `,
      });
    }
    const movie = await MovieModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).send({
        success: false,
        message: `this movie with id: ${req.params.id} is not found `,
      });
    }
    const deleteMovie = await MovieModel.findByIdAndDelete(req.params.id);
    if (deleteMovie != null) {
      return res.status(404).send({
        success: true,
        message: `this movie with id: ${req.params.id} is successfully deleted `,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: "Internal error" });
  }
};
module.exports = {
  getAllMovies,
  createNewMovie,
  getMoviesById,
  updateMovieById,
  deleteMovieById,
};

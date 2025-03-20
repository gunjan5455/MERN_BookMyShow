const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
  moviename: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  genre: {
    type: [String],
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  releasedate: {
    type: Date,
    required: true,
  },
});
const MovieModel = mongoose.model("movies", moviesSchema);
module.exports = MovieModel;

const { default: mongoose } = require("mongoose");
const MovieModel = require("../Models/movies.models");
const showModel = require("../Models/shows.models");
const theaterModel = require("../Models/theater.models");

const createShows = async (req, res) => {
  try {
    const { theater, movie } = req.body;
    const theaterDBOBJ = await theaterModel.findById(theater);
    if (theaterDBOBJ == null) {
      return res.status(400).send({
        success: false,
        message: "TheatreId is invalid",
      });
    }
    const movieDBOBJ = await MovieModel.findById(movie);
    if (movieDBOBJ == null) {
      return res.status(400).send({
        success: false,
        message: "movieId is invalid",
      });
    }
    const newShow = new showModel(req.body);
    await newShow.save();
    return res.status(201).send({
      success: true,
      message: "New Show has been added Successfully",
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal error", err });
  }
};
const getAllShows = async (req, res) => {
  try {
    const allShows = await showModel
      .find({})
      .populate("theater")
      .populate("movie");
    return res.status(201).send({
      success: true,
      message: "Shows has been fetched Successfully",
      data: allShows,
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err });
  }
};
const getTheaterandShowByMoviId = async (req, res) => {
  const { movieId } = req.params;
  const { date } = req.query;
  let allShows = await showModel.find({ movie: movieId }).populate("theater");
  // return res.send(allShows);
  let allUniqueTheater = [];
  allShows.forEach((show) => {
    const theater = allUniqueTheater.find((theaterId) => {
      return theaterId === show.theater._id;
    });
    if (!theater) {
      allUniqueTheater.push(show.theater._id);
    }
  });
  const uniqueTheatresAndTheirShows = allUniqueTheater.map((theaterId) => {
    //get all shows for this theatreId

    const allShowsForParticularTheatre = allShows.filter((show) => {
      return show.theater._id === theaterId;
    });

    return {
      theaterId,
      theatreDetails: allShowsForParticularTheatre[0].theater,
      allShowsForParticularTheatre,
    };
  });

  return res.status(200).send({
    success: true,
    message: "All Shows Fetched for the given movie",
    data: uniqueTheatresAndTheirShows,
  });
};
const getShowById = async (req, res) => {
  try {
    const showId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(showId)) {
      return res.status(400).send({
        success: false,
        message: "Invalid format!",
      });
    }
    const showData = await showModel
      .findById(showId)
      .populate("theater")
      .populate("movie");
    if (showData == null) {
      return res.status(404).send({
        success: false,
        message: "Show not found!",
      });
    }
    return res.status(200).send({
      success: true,
      message: `Show with  ${showId} is fatched successfully`,
      data: showData,
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error", err });
  }
};
module.exports = {
  createShows,
  getAllShows,
  getTheaterandShowByMoviId,
  getShowById,
};

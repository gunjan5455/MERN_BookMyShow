const mongoose = require("mongoose");

const showsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  theater: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "theater",
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: Array,
    default: [],
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
});
const showModel = mongoose.model("shows", showsSchema);
module.exports = showModel;

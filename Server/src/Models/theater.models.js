const mongoose = require("mongoose");

const theaterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});
const theaterModel = mongoose.model("theater", theaterSchema);
module.exports = theaterModel;

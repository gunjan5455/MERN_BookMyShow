const theaterModel = require("../Models/theater.models");

const getTheaters = async (req, res) => {
  try {
    const allTheaters = await theaterModel.find({}).populate("owner");
    const ownerNames = allTheaters.map((theater) => ({
      name: theater.owner.name,
      email: theater.owner.email,
    }));
    return res.status(200).send({
      success: true,
      message: "New Theatre has been fetched Successfully",
      data: allTheaters,
      owners: ownerNames,
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal error", err });
  }
};
const createTheaters = async (req, res) => {
  const theaterDetails = req.body;
  theaterDetails.owner = req.userDetails._id;
  try {
    const newTheater = new theaterModel(theaterDetails);
    await newTheater.save();
    return res.status(201).send({
      success: true,
      message: "New Theatre has been added Successfully",
    });
  } catch (err) {
    return res.status(500).send({ message: "Internal error", err });
  }
};
module.exports = {
  getTheaters,
  createTheaters,
};

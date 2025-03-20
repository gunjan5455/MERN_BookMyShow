const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin", "partner"],
    default: "user",
  },
  otp: {
    type: Number,
  },
  otpExpiry: {
    type: Date,
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;

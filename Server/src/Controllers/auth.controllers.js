const userModel = require("../Models/auth.models");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const OTPScript = require("../Scripts/OTPScript");
const sendEmail = require("../Utilities/NotificationUtilities");
const onLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "please enter correct data" });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .send({ sucsess: false, message: "user doesn't exist" });
    }
    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) {
      return res
        .status(400)
        .send({ success: false, message: "please enter correct password" });
    }
    var token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.SECRET
    );
    console.log(token);
    return res
      .status(201)
      .send({ success: true, message: "sucsessfully login ", token: token });
  } catch (err) {
    return res.status(500).send({ message: "please try again later" });
  }
};
const onRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ message: "please enter correct data" });
    }
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.send({ success: false, message: "email already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedpass = bcrypt.hashSync(req.body.password, salt);
    req.body.password = hashedpass;
    const newUser = new userModel(req.body);
    await newUser.save();
    return res
      .status(201)
      .send({ success: true, message: "register sucsess please login" });
  } catch (err) {
    return res.status(500).send({ message: "please try again later" });
  }
};
const onForget = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(401).send({
        success: false,
        message: "Email is missing!",
      });
    }
    let user = await userModel.findOne({ email });
    if (user == null) {
      return res.status(404).send({
        success: false,
        message: "User doesnot exists with this email Id",
      });
    }
    const otp = otpGenerator();
    console.log(otp);

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();
    sendEmail(
      [user.email],
      "Reset Password for Book my Show App",
      OTPScript(user.name, user.email, otp)
    );
    return res.status(200).send({
      status: "success",
      message: `OTP sent successfully on email Id ${user.email}`,
    });
  } catch (err) {
    return err;
  }
};
const onResetPassword = async (req, res) => {
  const { otp, password } = req.body;
  if (!otp || !password) {
    return res
      .status(404)
      .send({ success: "false", message: "OTP or Password Missing" });
  }
  const user = await userModel.findOne({ otp: otp });
  if (user == null) {
    return res.status(404).send({
      success: false,
      message: "OTP is incorrect",
    });
  }
  if (Date.now() > user.otpExpiry) {
    return res.status(404).send({
      success: false,
      message: "OTP has been expired",
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  user.password = hashedPassword;
  user.otp = null;
  user.otpExpiry = null;

  await user.save();

  return res.status(200).send({
    success: true,
    message: "Password Reset Successful",
  });
};

module.exports = {
  onLogin,
  onRegister,
  onForget,
  onResetPassword,
};
function otpGenerator() {
  return Math.floor(Math.random() * 10000 + 700000);
}

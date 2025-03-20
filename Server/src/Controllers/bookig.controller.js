const BookingsModel = require("../Models/booking.model");
const showModel = require("../Models/shows.models");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const makePayment = async (req, res) => {
  try {
    const { token, amount } = req.body;
    console.log(token, amount);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const paymentIntent = await stripe.paymentIntents.create({
      customer: customer.id,
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    const transactionId = paymentIntent.id;
    console.log(paymentIntent);
    return res.send({
      success: true,
      message: "Payment Successful",
      data: transactionId,
    });
  } catch (err) {
    return err;
  }
};
const creareBooking = async (req, res) => {
  try {
    const { show, seats, transactionId } = req.body;
    const userId = req.userDetails._id;
    const newBooking = new BookingsModel({
      show,
      seats,
      transactionId,
      userId,
    });
    const newBookingResponse = await newBooking.save();
    const showDetails = await showModel.findById(show);
    const updatedShow = [...showDetails.bookedSeats, ...seats];
    await showModel.findByIdAndUpdate(show, { bookedSeats: updatedShow });
    return res.send({
      success: true,
      message: `Booking successfully created with BookingId: ${newBookingResponse._id}`,
      data: newBookingResponse,
    });
  } catch (err) {
    return err;
  }
};
module.exports = {
  makePayment,
  creareBooking,
};

import { axiosInstance } from ".";

export const makePaymentAPI = async (data) => {
  console.log(data);
  try {
    const response = await axiosInstance.post(
      "https://bookmyshow-mern-j1p8.onrender.com/payment",
      {
        token: data.token,
        amount: data.amount,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

export const bookingAPI = async (data) => {
  console.log(data);
  try {
    const response = await axiosInstance.post(
      "https://bookmyshow-mern-j1p8.onrender.com/booking",
      {
        show: data.show,
        seats: data.seats,
        transactionId: data.transactionId,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

import { axiosInstance } from ".";

export const resetPasswordAPI = async (data) => {
  try {
    const response = await axiosInstance.post(
      "https://bookmyshow-mern-j1p8.onrender.com/reset",
      {
        otp: data.otp,
        password: data.password,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

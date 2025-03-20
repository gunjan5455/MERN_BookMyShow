import { axiosInstance } from ".";

export const resetPasswordAPI = async (data) => {
  try {
    const response = await axiosInstance.post(
      "https://bookmyshow-mern-bygunjan.onrender.com/reset",
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

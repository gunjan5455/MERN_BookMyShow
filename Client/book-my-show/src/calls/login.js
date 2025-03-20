import { axiosInstance } from ".";

export const loggedUser = async (data) => {
  console.log(data);
  try {
    const response = await axiosInstance.post(
      "https://bookmyshow-mern-j1p8.onrender.com/login",
      {
        email: data.email,
        password: data.password,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
};

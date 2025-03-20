import { axiosInstance } from ".";

export async function RegisterUser(value) {
  try {
    const response = await axiosInstance.post(
      "https://bookmyshow-mern-j1p8.onrender.com/register",
      {
        name: value.name,
        email: value.email,
        password: value.password,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function ForgetPasswordAPI(value) {
  try {
    const response = await axiosInstance.post(
      "https://bookmyshow-mern-j1p8.onrender.com/forget",
      {
        email: value.email,
      }
    );
    return response;
  } catch (err) {
    return err.response;
  }
}

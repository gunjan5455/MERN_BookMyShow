import { axiosInstance } from ".";

export async function getAllMovies() {
  try {
    const response = await axiosInstance.get(
      "https://bookmyshow-mern-j1p8.onrender.com/movies"
    );
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function getMoviesById(id) {
  try {
    const response = await axiosInstance.get(
      `https://bookmyshow-mern-j1p8.onrender.com/movies/${id}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
}

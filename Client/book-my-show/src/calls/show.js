import { axiosInstance } from ".";
export async function getAllShowsForAMovie(movieId, date) {
  try {
    const response = await axiosInstance.get(
      `https://bookmyshow-mern-bygunjan.onrender.com/movies/${movieId}/shows/?date=${date}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
}

export async function getShowsByIdAPI(showId) {
  try {
    const response = await axiosInstance.get(
      `https://bookmyshow-mern-bygunjan.onrender.com/shows/${showId}`
    );
    return response;
  } catch (err) {
    return err.response;
  }
}

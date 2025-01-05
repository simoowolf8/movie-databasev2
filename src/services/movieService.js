import axios from "axios";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Fetch API key from .env
const BASE_URL = "https://www.omdbapi.com/";

export const fetchMovies = async (query) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          s: query,
          apikey: API_KEY,
        },
      });
  
      if (!response.data.Search) {
        throw new Error("No movies found. Please try a different query.");
      }
  
      return response.data.Search;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw new Error(error.response?.data?.Error || "Could not fetch movies.");
    }
  };

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        i: id,
        apikey: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw new Error("Could not fetch movie details.");
  }
};

import axios from "axios";
const OMDB_API_KEY = process.env.OMDB_API_KEY;
const OMDB_BASE_URL = "https://www.omdbapi.com/";

const api = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    // Set loading state to true before request is sent
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    // Set loading state to false after response
    return response;
  },
  (error) => {
    // Set loading state to false if response error
    return Promise.reject(error);
  }
);

export const searchMovies = async (searchTerm: string, page = 1) => {
  try {
    const response = await api.get("/", {
      params: {
        s: searchTerm,
        page,
      },
    });

    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const getMovieDetails = async (id: string) => {
  try {
    const response = await api.get("/", {
      params: {
        i: id,
        plot: "full",
      },
    });

    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
    throw error;
  }
};

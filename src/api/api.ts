import { setLoading } from "@/lib/loadingService";
import axios from "axios";
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_BASE_URL = "https://www.omdbapi.com/";

const api = axios.create({
  baseURL: OMDB_BASE_URL,
  params: {
    apikey: OMDB_API_KEY,
  },
});

api.interceptors.request.use(
  (config) => {
    setLoading(true);
    return config;
  },
  (error) => {
    setLoading(false);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    setLoading(false);
    return response;
  },
  async (error) => {
    setLoading(false);
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

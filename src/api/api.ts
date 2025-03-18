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
  async (config) => {
    // Set loading state to true before request is sent
    const { store } = await import("@/store/store"); // Lazy import store.ts to avoid circular dependency
    const { setLoading } = await import("@/store/slices/uiSlice");

    store.dispatch(setLoading(true));
    return config;
  },
  async (error) => {
    const { store } = await import("@/store/store"); // Lazy import store.ts to avoid circular dependency
    const { setLoading } = await import("@/store/slices/uiSlice");
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    // Set loading state to false after response
    const { store } = await import("@/store/store"); // Lazy import store.ts to avoid circular dependency
    const { setLoading } = await import("@/store/slices/uiSlice");
    store.dispatch(setLoading(false));
    return response;
  },
  async (error) => {
    // Set loading state to false if response error
    const { store } = await import("@/store/store"); // Lazy import store.ts to avoid circular dependency
    const { setLoading } = await import("@/store/slices/uiSlice");
    store.dispatch(setLoading(false));
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

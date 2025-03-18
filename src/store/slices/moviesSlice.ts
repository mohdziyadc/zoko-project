import { Movie, MovieDetails } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MovieState {
  searchResults: Movie[];
  searchTerm: string;
  totalResults: number;
  currentPage: number;
  selectedMovie: MovieDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  searchResults: [],
  searchTerm: "",
  totalResults: 0,
  currentPage: 1,
  selectedMovie: null,
  status: "idle",
  error: null,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
    },
    resetSearch: (state) => {
      state.searchResults = [];
      state.searchTerm = "";
      state.totalResults = 0;
      state.currentPage = 1;
      state.status = "idle";
    },
  },
});

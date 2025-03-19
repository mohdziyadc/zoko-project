import { getMovieDetails, searchMovies } from "@/api/api";
import { Movie, MovieDetails } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchMoviesBySearch = createAsyncThunk(
  "movies/fetchMoviesBySearch",
  async (params: { searchTerm: string; page?: number }) => {
    const response = await searchMovies(params.searchTerm, params.page);
    return response;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchMovieDetails",
  async (id: string) => {
    const response = await getMovieDetails(id);
    return response;
  }
);

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
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesBySearch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.status = "succeeded";

        console.log("Succeeded");

        if (action.meta.arg.page === 1) {
          state.searchResults = action.payload.Search || [];
        } else {
          state.searchResults = [
            ...state.searchResults,
            ...(action.payload.Search || []),
          ];
        }
        state.totalResults = parseInt(action.payload.totalResults || "0", 10);
        state.currentPage = action.meta.arg.page || 1;
        state.error = null;
      })
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.status = "failed";
        state.searchResults = [];
        state.totalResults = 0;
        state.currentPage = 1;
        state.status = "idle";
        state.error = action.error.message || "Failed to fetch movies";
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedMovie = action.payload;
        state.error = null;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch movie details";
      });
  },
});

export const { setSearchTerm, resetSearch, clearSelectedMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;

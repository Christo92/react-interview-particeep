import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { movies$ } from "../api/movies";

export interface MoviesItem {
  id: string;
  title: string;
  category: string;
  likes: number;
  dislikes: number;
}

export interface MoviesState {
  list: MoviesItem[];
  loading: boolean;
}

const initialState: MoviesState = {
  list: [],
  loading: false,
};

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const res = await movies$.then((data) => data);
  return res;
});

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    deleteMovie: (state, { payload }) => {
      const updateList = state.list.filter((movie) => movie.id !== payload);
      state.list = updateList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.list = payload;
    });
    builder.addCase(getMovies.rejected, (state) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { deleteMovie } = moviesSlice.actions;

export default moviesSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "../features/moviesSlice";
import { useDispatch } from "react-redux";

// Configure Redux store with moviesReducer
export const store = configureStore({
  reducer: {
    movies: moviesReducer, // Combine with other reducers if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>; // Type representing the entire state of the Redux store
export type AppDispatch = typeof store.dispatch; // Type representing the dispatch function type

// Custom hook to get typed dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>();

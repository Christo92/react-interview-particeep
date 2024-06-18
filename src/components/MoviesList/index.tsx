import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import MovieItem from "./MoviesItems";

export default function MoviesList() {
  const moviesList = useSelector((state: RootState) => state.movies.list);

  // If moviesList is empty
  // No movies Disponible // Add Loader

  return (
    <Grid
      container
      item
      sx={{ justifyContent: "space-between", padding: "20px 30px" }}
    >
      {moviesList.map((movie) => {
        return <MovieItem key={movie.id} movie={movie} />;
      })}
    </Grid>
  );
}

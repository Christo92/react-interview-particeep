import { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { getMovies } from "../../features/moviesSlice";
import { useAppDispatch } from "../../store";
import MoviesList from "../MoviesList";
import { Toaster } from "react-hot-toast";

/**
 * Main component to display all application
 * @returns
 */
function App() {
  const dispatch = useAppDispatch();

  /**
   * The dispatch getMovies() trigger the fetch to get all movies from api
   */
  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toaster />
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#333333" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FilmsUniverse
          </Typography>
        </Toolbar>
      </AppBar>
      <MoviesList />
    </Box>
  );
}

export default App;

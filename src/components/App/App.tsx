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

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toaster />
      <AppBar position="static">
        <Toolbar>
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

import {
  Box,
  Card,
  CardActions,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CancelIcon from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MoviesItem, deleteMovie } from "../../../features/moviesSlice";
import { useAppDispatch } from "../../../store";
import toast from "react-hot-toast";

interface Item {
  movie: MoviesItem;
}

export default function MovieItem({ movie }: Item) {
  const dispatch = useAppDispatch();

  return (
    <>
      <Card sx={{ marginBottom: "20px", width: 345 }}>
        <CardHeader
          action={
            <IconButton
              aria-label="delete-movie"
              onClick={() => {
                dispatch(deleteMovie(movie.id));
                toast.success("Film supprimé !");
              }}
            >
              <CancelIcon />
            </IconButton>
          }
          title={movie.title}
          subheader={movie.category}
        />
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex" }}
            >
              <ThumbUpIcon sx={{ height: "18px" }} /> {movie.likes}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex" }}
            >
              <ThumbDownIcon sx={{ height: "18px" }} /> {movie.dislikes}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

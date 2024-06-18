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
import {
  MoviesItem,
  deleteMovie,
  setLikeMovie,
  setDislikeMovie,
} from "../../../features/moviesSlice";
import { useAppDispatch } from "../../../store";
import toast from "react-hot-toast";

interface Item {
  movie: MoviesItem;
}

export default function MovieItem({ movie }: Item) {
  const dispatch = useAppDispatch();

  return (
    <>
      <Card sx={{ margin: "10px", width: 345, boxShadow: 2, borderRadius: 1 }}>
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
          title={
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {movie.title}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              {movie.category}
            </Typography>
          }
        />
        <CardActions
          disableSpacing
          sx={{ justifyContent: "end", padding: "0 16px 16px" }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", cursor: "pointer" }}
            >
              <ThumbUpIcon
                sx={{
                  height: "18px",
                  cursor: "pointer",
                  marginRight: "4px",
                  color: "#1976d2",
                }}
                onClick={() => dispatch(setLikeMovie(movie.id))}
              />{" "}
              {movie.likes}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", cursor: "pointer" }}
            >
              <ThumbDownIcon
                sx={{
                  height: "18px",
                  cursor: "pointer",
                  marginRight: "4px",
                  color: "#d32f2f",
                }}
                onClick={() => dispatch(setDislikeMovie(movie.id))}
              />{" "}
              {movie.dislikes}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

import { useState } from "react";
import { RootState, useAppDispatch } from "../../store";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MovieItem from "./MoviesItems";
import { setFilterCategory } from "../../features/moviesSlice";
import ReactPaginate from "react-paginate";

interface PageChangeEventData {
  selected: number;
}

/**
 * MoviesList component: display movies fetch from movies api
 * @returns
 */
export default function MoviesList() {
  const dispatch = useAppDispatch();
  const moviesList = useSelector((state: RootState) => state.movies.list);
  const filterCategory = useSelector(
    (state: RootState) => state.movies.filterCategory
  );
  const [moviesPerPage, setMoviesPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  // Extracting unique categories from moviesList
  const categories = [...new Set(moviesList.map((movie) => movie.category))];

  // Filter movies based on selected category
  const filteredMovies =
    filterCategory === "All"
      ? moviesList
      : moviesList.filter((movie) => movie.category === filterCategory);

  // Calculate pagination variables
  const offset = currentPage * moviesPerPage;
  const currentMovies = filteredMovies.slice(offset, offset + moviesPerPage);
  const pageCount = Math.ceil(filteredMovies.length / moviesPerPage);

  // Handle category filter change
  const handleCategoryFilter = (category: string) => {
    dispatch(setFilterCategory(category));
    setCurrentPage(0); // Reset to the first page when the category changes
  };

  // Handle pagination page change
  const handlePageClick = (event: PageChangeEventData) => {
    setCurrentPage(event.selected);
  };

  // Handle movies per page change
  const handleMoviesPerPageChange = (event: SelectChangeEvent<number>) => {
    setMoviesPerPage(Number(event.target.value));
    setCurrentPage(0); // Reset to the first page when the category changes
  };

  return (
    <Container>
      {/* Category filter buttons */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <ButtonGroup
          variant="contained"
          color="primary"
          aria-label="outlined primary button group"
        >
          <Button
            onClick={() => handleCategoryFilter("All")}
            variant={filterCategory === "All" ? "contained" : "outlined"}
          >
            Tout
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              variant={filterCategory === category ? "contained" : "outlined"}
            >
              {category}
            </Button>
          ))}
        </ButtonGroup>
      </Box>

      {/* Movies per page selector */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        <FormControl variant="outlined" margin="normal" sx={{ width: "150px" }}>
          <InputLabel id="movies-per-page-label">Films par page</InputLabel>
          <Select
            labelId="movies-per-page-label"
            id="moviesPerPage"
            value={moviesPerPage}
            onChange={handleMoviesPerPageChange}
            label="Films par page"
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={12}>12</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Display movies grid or message if no movies */}
      <Grid
        container
        item
        sx={{ justifyContent: "flex-start", padding: "20px 10px" }}
      >
        {currentMovies.length > 0 ? (
          currentMovies.map((movie) => {
            return <MovieItem key={movie.id} movie={movie} />;
          })
        ) : (
          <p>Aucun film disponible</p>
        )}
      </Grid>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"Précedent"}
        nextLabel={"Suivant"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </Container>
  );
}

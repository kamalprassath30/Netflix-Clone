import React, { useEffect, useState } from "react";
import "./Row.css";
import axios from "./axios";

function Row({
  title,
  fetchUrl,
  isLargeRow = false,
  filter,
  latestFilter,
  filteredMovie,
}) {
  const [movies, setMovies] = useState([]);
  const searchQuery = filteredMovie ? filteredMovie.toLowerCase() : "";

  let filtered = searchQuery
    ? movies.filter((movie) =>
        (movie?.title || movie?.name || movie?.original_name)
          ?.toLowerCase()
          .includes(searchQuery)
      )
    : movies;

  if (filter) {
    filtered = movies.filter((movie) => movie?.media_type == "movie");
  }

  if (latestFilter) {
    filtered = movies.filter((movie) => movie?.release_date?.includes("2025"));
  }
  // useEffect(() => {
  //   if (filteredMovie) {
  //     setMovies(filtered);
  //   }
  // }, [filteredMovie]);

  const base_url = "https://image.tmdb.org/t/p/original/";

  const movieRating = (rating) => {
    return rating.toFixed(1);
  };
  const releaseYear = (date) => {
    return date ? date.split("-")[0] : "N/A";
  };

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // if (handleMovies) {
      //   handleMovies(request.data.results);
      // }
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  console.log("movie", filtered);
  return (
    <div className="row">
      {filtered.length > 0 && <h2>{title}</h2>}
      <div className="row_posters">
        {filtered.map(
          (movie) =>
            ((isLargeRow && movie.poster_path) ||
              (!isLargeRow && movie.backdrop_path)) && (
              <div className="row_posterContainer" key={movie.id}>
                <img
                  className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                  key={movie.id}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
                <div className="row_posterDetails">
                  <div className="posterButton_rating">
                    <button className="poster_button">Play Now</button>
                    <p>{movieRating(movie.vote_average)} ⭐</p>
                    {/* <img src="https://www.svgrepo.com/show/424902/imdb-logo-cinema.svg" /> */}
                  </div>
                  {isLargeRow ? (
                    <div className="postertitle_year">
                      <h5>{movie.name || movie.title}</h5>
                      <h5>{releaseYear(movie.release_date) || "N/A"}</h5>
                    </div>
                  ) : (
                    <div className="postertitle_year">
                      <h6>{movie.name || movie.title}</h6>
                      <h6>{releaseYear(movie.release_date) || "N/A"}</h6>
                    </div>
                  )}
                  <p className="description">
                    {isLargeRow
                      ? movie.overview
                        ? movie.overview.slice(0, 100) + "..."
                        : "No description available"
                      : movie.overview
                      ? movie.overview.slice(0, 75) + "..."
                      : "No description available"}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default Row;

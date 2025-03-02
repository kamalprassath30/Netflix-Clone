import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "./axios";
import requests from "./Requests";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const API_KEY = "e3fe1761be7e408f4ad5f4ab426e3b82";

  const fetchTrailer = async (movie) => {
    try {
      const response = await axios.get(
        `/movie/${movie?.id}/videos?api_key=${API_KEY}`
      );
      const trailers = response.data.results;
      // console.log("trailers: ", trailers);
      const trailer = trailers.find((vid) => vid.type === "Trailer");
      if (trailer) {
        setTrailerUrl(trailer.key);
      } else {
        alert("Sorry! Movie trailer not found");
      }
    } catch (error) {
      console.error("Error fetching trailer: ", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const reqKeys = Object.keys(requests);
      const randomKey = reqKeys[Math.floor(Math.random() * reqKeys.length)];
      const request = await axios.get(requests[randomKey]);

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  const closeModal = () => setTrailerUrl("");
  console.log(movie);
  return (
    <>
      <header
        className="banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${
            movie?.backdrop_path || movie?.poster_path
          }")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_buttons">
            <button
              className="banner_button"
              onClick={() => fetchTrailer(movie)}
            >
              Play
            </button>
            <button className="banner_button">My List</button>
          </div>
          <h1 className="banner_description">
            {truncate(movie?.overview, 150)}
          </h1>
        </div>
        <div className="banner--fadeBottom" />
      </header>

      {trailerUrl && (
        <div className="modal" onClick={closeModal}>
          <div className="modal_content" onClick={(e) => e.stopPropagation()}>
            {/* <span className="close" onClick={closeModal}>
              &times;
            </span> */}
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="modal_btn">
              <button className="banner_button">Watch Later</button>
            </div>
            <div className="modal_overview">
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Banner;

import React, { useState } from "react";
import "./HomeScreen.css";
import Nav from "../Nav";
import Banner from "../Banner";
import Row from "../Row";
import requests from "../Requests";

function HomeScreen() {
  const [movieData, setMovieData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [latestFilter, setLatestFilter] = useState(false);
  const handleMovies = (data) => {
    setMovieData(data);
  };

  const filters = () => {
    setFilter(!filter);
  };

  const latest = () => {
    setLatestFilter(!latestFilter);
  };

  return (
    <div className="homeScreen">
      <Nav onSearch={handleMovies} filters={filters} latest={latest} />
      <Banner />
      {[
        {
          title: "Netflix Originals",
          fetchUrl: requests.fetchNetflixOriginals,
          isLargeRow: true,
        },
        { title: "Trending now", fetchUrl: requests.fetchTrending },
        { title: "Top Rated", fetchUrl: requests.fetchTopRated },
        { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
        { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies },
        { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies },
        { title: "Romance Movies", fetchUrl: requests.fetchRomanceMovies },
        { title: "Documentaries", fetchUrl: requests.fetchDocumentaries },
      ].map((row) => (
        <Row
          key={row.title}
          title={row.title}
          fetchUrl={row.fetchUrl}
          isLargeRow={row.isLargeRow}
          filter={filter}
          latestFilter={latestFilter}
          {...(movieData.length > 0 && { filteredMovie: movieData })}
        />
      ))}
    </div>
  );
}

export default HomeScreen;

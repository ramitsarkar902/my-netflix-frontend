import React, { useState, useEffect } from "react";
import axios from "../Api-fetch/axios";
import requests from "../Api-fetch/requests";
import "./styles/Banner.css";
function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const random = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[random]);
      return request;
    }
    fetchData();
  }, []);
  const truncateStr = (str, num) => {
    return str?.length > num ? str.substring(0, num - 1) + " ..." : str;
  };
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>
        <h1 className="banner-description">
          {truncateStr(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner-fadebottom" />
    </header>
  );
}

export default Banner;

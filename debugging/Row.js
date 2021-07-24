import React, { useState, useEffect } from "react";
import axios from "../Api-fetch/axios";
import "./styles/Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const image_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [name, setName] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    weight: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.error(error));
    }
    console.log(trailerUrl);
  };

  return (
    <div className="row">
      <h4>{title}</h4>

      <div className="row-posters">
        {movies.map((movie) => {
          const { poster_path, id, original_title, backdrop_path } = movie;
          return (
            <img
              className={`row-poster ${isLargeRow && "row-posterLarge"}`}
              key={id}
              src={`${image_url}${isLargeRow ? poster_path : backdrop_path}`}
              alt={movie.name}
              onclick={handleClick(movie)}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

//<Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow/>
//<Row title="TRENDING NOW" fetchUrl={requests.fetchTrending} />
//<Row title="TOP RATED" fetchUrl={requests.fetchTopRated} />
//<Row title="ACTION" fetchUrl={requests.fetchActionMovies} />
//<Row title="HORROR" fetchUrl={requests.fetchHorrorMovies} />
//<Row title="ROMANTIC" fetchUrl={requests.fetchRomanceMovies} />
// <Row title="COMEDY" fetchUrl={requests.fetchComedyMovies} />
//<Row title="DOCUMENTARY" fetchUrl={requests.fetchDocumentaries} />

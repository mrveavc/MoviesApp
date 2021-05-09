/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Container from "../GlobalComponents/Container";
import Loader from "../GlobalComponents/Loader";
const IMG_API = "https://image.tmdb.org/t/p/w1280";

const Movies = ({ title,poster_path, overview, vote_average }) => {
  const { movies, isLoading } = useContext(AuthContext);

  return (
    <div css={styles} className="movies">
      <Container>
        {movies.results && movies.results.length === 0 && (
          <h1 className="error">
            <span>&#9785;</span> Sonuç Bulunamadı
          </h1>
        )}
        {!isLoading ? (
          movies.results &&
          movies.results.map((movieItem, index) => (
            <div className="movie">
              <img
               key={index}
                src={
                  movieItem.poster_path
                    ? IMG_API + movieItem.poster_path
                    : "https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80"
                }
                alt={movieItem.title}
              ></img>
              <div className="movie-info">
                <h3>{movieItem.title}</h3>
                <span > {movieItem.vote_average}</span>
              </div>
              <div className="overview">
                <h2>Overview</h2>
                <p className="yazi">{movieItem.overview }</p>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </Container>
    </div>
  );
};

const styles = css`
  width: 100%;
  .container {
    &:nth-child(1) {
      height: 100vh;
      overflow-y: scroll;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      &::-webkit-scrollbar {
        width: 0;
      }
      .error {
        font-size: 38px;
        color: red;
        height: 32px;
      }
    }
    img {
      width: 100%;
     
      height: 360px;
      
    }
  }
  @media (max-width: 600px) {
    .container {
      img {
        max-width: 100%;
        height: 500px;
      }
    }
  }
  @media (min-width: 601px) and (max-width: 854px) {
    .container {
      img {
        max-width: 48%;
      }
    }
  }
  @media (min-width: 855px) and (max-width: 1144px) {
    .container {
      img {
        max-width: 31%;
      }
    }
  }
  @media (min-width: 1145px) and (max-width: 1365px) {
    .container {
      img {
        max-width: 23.4%;
      }
    }
  }
`;

export default Movies;

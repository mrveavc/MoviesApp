import React, {  useEffect,useState } from "react";
import axios from "axios";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

export default function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];

  const url = "https://api.themoviedb.org/3";
  const apiKey = "a4999a28333d1147dbac0d104526337a";
  
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  const movieUrl = `${url}/movie`;
  async function fetchSimilarMovie(id) {
    try {
      const { data } = await axios.get(`${movieUrl}/${id}/similar`, {
        params: {
          api_key: apiKey,
          language: "en_US",
        },
      });
      const posterUrl = "https://image.tmdb.org/t/p/original/";
      const modifiedData = data["results"].map((m) => ({
        id: m["id"],
        backPoster: posterUrl + m["backdrop_path"],
        popularity: m["popularith"],
        title: m["title"],
        poster: posterUrl + m["poster_path"],
        overview: m["overview"],
        rating: m["vote_average"],
      }));

      return modifiedData;
    } catch (error) {}
  }

  async function fetchCasts(id) {
    try {
      const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
        params: {
          api_key: apiKey,
        },
      });
      const modifiedData = data["cast"].map((c) => ({
        id: c["cast_id"],
        character: c["character"],
        name: c["name"],
        img: "https://image.tmdb.org/t/p/w200" + c["profile_path"],
      }));

      return modifiedData;
    } catch (error) {}
  }
  async function fetchMovieVideos(id) {
    try {
      const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
        params: {
          api_key: apiKey,
        },
      });
      return data["results"][0];
    } catch (error) {}
  }
  async function fetchMovieDetail(id) {
    try {
      const { data } = await axios.get(`${movieUrl}/${id}`, {
        params: {
          api_key: apiKey,
          language: "en_US",
        },
      });
      return data;
    } catch (error) {}
  }
  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };

    fetchAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  genres = detail.genres;

  const MoviePalyerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#000000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img  
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p  style={{color:"white"}} className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link  to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{color:"white", fontWeight: "bolder" }}>{item.title}</p>
          <p style={{color:"white"}}>Rated: {item.rating}</p>
          {/* <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars> */}
        </div>
      </div>
    );
  });

  return (
    
    <div style={{ borderLeft: "1px solid #5a606b" }} className="container">
      <div className="row mt-2"  >
        <MoviePalyerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePalyerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          ></img>
          <div  style={{marginTop:"-630px"}} className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <div 
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 ,}}
          >
           <p style={{marginTop:"-1250px"}} > {detail.title} </p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>GENRE</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col" >
          <ul className="list-inline" >{genresList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            {/* <ReactStars
              count={detail.vote_average}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars> */}
          </div>
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bolder" }}>OVERVIEW</p>
            <p style={{color:"white"}}>{detail.overview}</p>
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RELEASE DATE</p>
          <p style={{ color: "#f4c10f" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>RUN TIME</p>
          <p style={{ color: "#f4c10f" }}>{detail.runtime} dk</p>
        </div>
      
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>CASTS</p>
        </div>
      </div>
      <div className="row mt-3">{castList}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#5a606b", fontWeight: "bolder" }}>
            SIMILAR MOVIES
          </p>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>

      <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>

    </div>
  );
}

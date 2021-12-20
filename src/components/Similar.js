import React, {  useEffect,useState } from "react";
import axios from "axios";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";

export default function Similar({ match }) {
  let params = match.params;

  const url = "https://api.themoviedb.org/3";
  const apiKey = "a4999a28333d1147dbac0d104526337a";
  
  const [similarMovie, setSimilarMovie] = useState([]);

  const movieUrl = `${url}/movie`;

  useEffect(() => {
    const fetchAPI = async () => {
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };

    fetchAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);
 
  
  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div style={{width:"10%"}} className="col-md-3 col-sm-3" key={index}>
          <Link  to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        <div className="mt-3">
          <p style={{color:"white", fontWeight: "bolder" }}>{item.title}</p>
         
        </div>
      </div>
    );
  });
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



  return (
    
    <div style={{ borderLeft: "1px solid #5a606b" }} className="container">
     
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

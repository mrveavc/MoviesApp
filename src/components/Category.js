import React , {useContext} from "react";

import { useEffect, useState } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import {
    ModalProvider,
    Modal,
    useModal,
    ModalTransition,
  } from 'react-simple-hook-modal';
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import MovieDetail from "./MovieDetail";
import { AuthContext } from "../Context/AuthContext";


export default function Category() {
  const { currentUser ,fav,add/*,deleteFav*/} = useContext(AuthContext);

  const [movieByGenre, setMovieByGenre] = useState([]);
  const { isModalOpen, openModal } = useModal();
  const url = "https://api.themoviedb.org/3";
  const [genres, setGenres] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
const [visible,setVisible]=useState(1);
  const apiKey = "9d4fbae6d45a1f406cc115a66a4de03d";
  
  useEffect(() => {
    fetchAPI();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const moviesUrl = `${url}/discover/movie?api_key=ba580b8ef4ced426252acbd8f339ce54&language=en_US&page=${visible}`;
  const nowPlayingUrl = `${url}/movie/now_playing`;
  const genreUrl = `${url}/genre/movie/list`;


    
 
  const showMoreItems = async (genre_id) => {
  setVisible((prevValue)=> prevValue+1)
}


  async function fetchMovieByGenre(genre_id) {
    try {
      const { data } = await axios.get(moviesUrl, {
        params: {
          with_genres: genre_id,
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

  const genreList = genres.map((item, index) => {
  
    return (
      
      <li className="list-inline-item" key={index}>
        <button
          type="button"
          id="btn-outline-info"
          className="btn"
          onClick={() => {
            handleGenreClick(item.id)
            
          }}
        >
          {item.name}
        </button>
      </li>
    );
  });
  async function handleGenreClick(genre_id) {
     showMoreItems(genre_id)
    setMovieByGenre(await fetchMovieByGenre(genre_id));
     }
 

  async function fetchMovies() {
    try {
      const { data } = await axios.get(nowPlayingUrl, {
        params: {
          api_key: apiKey,
          language: "en_US",
          page: 1,
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

  async function fetchGenre() {
    try {
      const { data } = await axios.get(genreUrl, {
        params: {
          api_key: apiKey,
          language: "en_US",
          page: 1,
        },
      });
      const modifiedData = data["genres"].map((g) => ({
        id: g["id"],
        name: g["name"],
      }));
      return modifiedData;
    } catch (error) {}
  }

     const fetchAPI = async () => {
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28)); 
      
    };

  const moviess = nowPlaying.slice(0, 10).map((item, index) => {
    return (
      <div style={{ height: 500, width: "100%" }} key={index}>
        <div className="carousel-center">
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#f4c10f" }}
          ></i>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {item.title}
        </div>
      </div>
    );
  });


  const movieList = movieByGenre.slice(0, 20).map((item, index) => {
   
    return (
      
      <div className="col-md-3 col-sm-6" key={index}>
         
        <div className="card" >
          <Link onClick={openModal} to={`/movie/${item.id}`} >
            <img  className="img-fluid" src={item.poster} alt={item.title}></img> 
            
          </Link>

          {currentUser ? (
        <> <div className="controls">

        

        <button
          className="add"
          onClick={() => add(item) }
        >            

          Add to Watched
        </button>
       

      </div></>
      ) : (
        <>
        </>

      )}   

        </div>
        <div className="mt-3">
          <p style={{ color: "white", fontWeight: "bolder" }}>{item.title}</p>
          <p style={{ color: "white", fontWeight: "bolder" }}>
            Rated: {item.rating}
          </p>
        
        </div>

      </div>
     
    );
  });
  const  MyComponent=()=>{

      
    return (
      <>
      
        
        <Modal 
       
          isOpen={isModalOpen}
          transition={ModalTransition.NONE}
          
        > 
       
      
         <Switch>
        
         <Route path="/movie/:id" component={MovieDetail} />

         </Switch>
        
        
        </Modal>
      </>
    );
  };
  
 

 
  
  return (
      
    <>
    
    <div  className="container"   id="a">
    <div>
   {fav.map((school)=>(
     <div key={school.id}>
    <h2>{school.fav}</h2>
          </div>
    ))

    }
     </div>
 

        <h2 style={{color:"white", fontWeight:"600" }}>In Theaters</h2>
        <div className="row mt-2">
           
         
          <div className="col">
            <RBCarousel
              autoplay={true}
              pauseOnVisibility={true}
              slidesshowSpeed={5000}
              version={4}
              indicators={false}
            >
              {moviess}
            </RBCarousel>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <ul className="list-inline">{genreList}</ul>
          </div>
        </div>

       
        <div  className="row mt-3">{movieList}</div>
    
     
       
      </div>
      
      <ModalProvider   >
      <MyComponent  />
      </ModalProvider>
    </>
  );
}



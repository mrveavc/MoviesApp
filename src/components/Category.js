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
// import { firestore } from "../firebase";
// import Watched from "./Watched";
// import { firestore} from "../firebase";

// import { useAuth } from "../Context/AuthContext";
// import ReactStars from "react-rating-stars-component";

export default function Category() {
  const { currentUser ,fav,add/*,deleteFav*/} = useContext(AuthContext);

  const [movieByGenre, setMovieByGenre] = useState([]);
  const { isModalOpen, openModal } = useModal();
  const url = "https://api.themoviedb.org/3";
  const [genres, setGenres] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
const [visible,setVisible]=useState(1);
//  const [list,setList]=useState("");
  const apiKey = "9d4fbae6d45a1f406cc115a66a4de03d";
  // const [fav, setFav] = useState([]);
    // const [loading, setLoading] = useState(false);
  // const {
  //   // addMovieToWatchlist,
  //   // addMovieToWatched,
  //   watchlist,
  //   // watched,
  // } = useContext(AuthContext);

  
  // function getFav() {
  //   setLoading(true);
  //   ref.onSnapshot((querySnapshot) => {
  //     const items =[];
  //     querySnapshot.forEach((doc)=>{
  //       items.push(doc.data());
  //     })
  //     setFav(items);
  //     setLoading(false);
  //   });
  // }
  useEffect(() => {
    // getFav();

 
    fetchAPI();
    // firestore.collection('users').get().then(snapshot=>{  

    //   const students=[]
    //   snapshot.forEach(doc=>{
    //     const data=doc.data()
    //     students.push(data)
    //   })
    //   this.setState({students:students})
      
    //   // console.log(snapshot)
    // }).catch(error=>console.log(error))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
// if(loading){
//   return  <h1>Loading</h1>
// }

  const moviesUrl = `${url}/discover/movie?api_key=ba580b8ef4ced426252acbd8f339ce54&language=en_US&page=${visible}`;
  const nowPlayingUrl = `${url}/movie/now_playing`;
  const genreUrl = `${url}/genre/movie/list`;


  // const newPage = (direction) => {
  //   //NEXT - PREVİOUS
  //   if (direction === "next") {
  //     setCurrentPage(currentPage + 1);
  //   } else if (direction === "previous" && currentPage !== 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
    
  // };
  const showMoreItems = async (genre_id) => {

  // setMovieByGenre(await fetchMovieByGenre(genre_id)); 
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
   
    // clk(genre_id)
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
      setMovieByGenre(await fetchMovieByGenre(28)); // Actiondan başlatıyor 35 comedy 80 crime
      
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
    // let storedMovie = watchlist.find((o) => o.id === item.id);
    // let storedMovieWatched = watched.find((o) => o.id === item.id);
    
  // const watchlistDisabled = storedMovie
  // ? true
  // : false
  // ? true
  // : false;

// const watchedDisabled = storedMovieWatched ? true : false;
    return (
      
      <div className="col-md-3 col-sm-6" key={index}>
         
        <div className="card" >
          <Link onClick={openModal} to={`/movie/${item.id}`} >
            <img  className="img-fluid" src={item.poster} alt={item.title}></img> 
            
          </Link>

          {currentUser ? (
        <> <div className="controls">

         {/* <button
          className="add"
          disabled={watchlistDisabled}
          onClick={() => addMovieToWatchlist(item)}
        >

          Add to Watchlist
        </button>  */}

        <button
          className="add"
          // disabled={watchlistDisabled}
          onClick={() => add(item) /*addMovieToWatched(item)*/}
        >            

          Add to Watched
        </button>
        {/* <button onClick={() => deleteFav(fav)}>X</button> */}

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
          {/* <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars> */}
        </div>

      </div>
     
    );
  });
  const  MyComponent=()=>{

      
    return (
      <>
        {/* <button onClick={openModal}>Open</button> */} 
        
        <Modal 
        //   id="any-unique-identifier"
          isOpen={isModalOpen}
          transition={ModalTransition.NONE}
          
        > 
       
        {/* <button  to="/" onClick={closeModal} >Close</button> */}
         <Switch>
         {/* <Route exact path="/" component={Category}  /> */}
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
           
          {/*  EN BAŞTAKİ*/}
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

        {/* <div className="row mt-3">
          <div className="col">
            <div className="float-right">
              <i className="far fa-arrow-alt-circle-right"></i>
            </div>
          </div>
        </div> */}
        <div  className="row mt-3">{movieList}</div>
        {/* <button onClick={showMoreItems}>add more</button> */}
        {/* <button
              style={{
                cursor: currentPage !== 1 ? "pointer" : "not-allowed",
                background: currentPage !== 1 ? "#2F4F4F" : "#696969",
              }}
              onClick={() => newPage("previous")}
            >
              
              Prev Page
            </button>
            <button  style={{
               
                background:  "#2F4F4F",
              }} onClick={() => newPage("next")}>Next Page</button> */}
       
      </div>
      
      <ModalProvider   >
      <MyComponent  />
      </ModalProvider>
    </>
  );
}
















// import React, { useEffect, useState } from 'react'
// import { Typography, Row } from 'antd';
// // import MainImage from './MainImage'
// import GridCard from './GridCards'

// const { Title } = Typography;
// //SERVER ROUTES
// // export const USER_SERVER = '/api/users';



// export const API_URL = 'https://api.themoviedb.org/3/';
// export const API_KEY = '844dba0bfd8f3a4f3799f6130ef9e335';


// export const IMAGE_BASE_URL ='http://image.tmdb.org/t/p/';


// export const POSTER_SIZE = 'w500'
// function LandingPage() {

//     const [Movies, setMovies] = useState([])
//     const [MainMovieImage, setMainMovieImage] = useState(null)
//     const [Loading, setLoading] = useState(true)
//     const [CurrentPage, setCurrentPage] = useState(0)
//  const cl=()=>{
//         const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=28`;
//         fetchMovies(endpoint)
   
//    } 
//     useEffect(() => {
      
//        cl();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//       }, [])

 
//     const fetchMovies = (endpoint) => {

//         fetch(endpoint)
//             .then(result => result.json())
//             .then(result => {
//                 // console.log(result)
//                 // console.log('Movies',...Movies)
//                 // console.log('result',...result.results)
//                 setMovies([...Movies, ...result.results])
//                 setMainMovieImage(MainMovieImage || result.results[0])
//                 setCurrentPage(result.page)
//             }, setLoading(false))
//             .catch(error => console.error('Error:', error)
//             )
//     }

//     const loadMoreItems = () => {
//         let endpoint = '';
//         setLoading(true)
//         console.log('CurrentPage', CurrentPage)
//         // endpoint = `${API_URL}/discover/movie?api_key=${API_KEY}&language=en_US&page=${CurrentPage + 1}`;
//         endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28&page=${CurrentPage + 1}`;
//         fetchMovies(endpoint);

//     }

//     return (
//         <div style={{ width: '100%', margin: '0' }}>
//         <div className="row mt-3">
//           <div className="col">
//             <button onClick={cl}><ul className="list-inline">Action</ul></button>
//             {/* <button onClick={cl}><ul className="list-inline">Adventure</ul></button>
//             <button onClick={cl}><ul className="list-inline">Animation</ul></button>
//             <button onClick={cl}><ul className="list-inline">Comedy</ul></button>
//             <button onClick={cl}><ul className="list-inline">Crime</ul></button>
//             <button onClick={cl}><ul className="list-inline">Documentary</ul></button>
//             <button onClick={cl}><ul className="list-inline">Drama</ul></button>
//             <button onClick={cl}><ul className="list-inline">Family</ul></button>
//             <button onClick={cl}><ul className="list-inline">Fantasy</ul></button>
//             <button onClick={cl}><ul className="list-inline">History</ul></button>
//             <button onClick={cl}><ul className="list-inline">Horror</ul></button>
//             <button onClick={cl}><ul className="list-inline">Music</ul></button>
//             <button onClick={cl}><ul className="list-inline">Mystery</ul></button> */}
//             <button onClick={cl}><ul className="list-inline">Romance</ul></button>
//             {/* <button onClick={cl}><ul className="list-inline">Science Fiction</ul></button>
//             <button onClick={cl}><ul className="list-inline">TV Movie"</ul></button>
//             <button onClick={cl}><ul className="list-inline">Thriller</ul></button>
//             <button onClick={cl}><ul className="list-inline">War</ul></button>
//             <button onClick={cl}><ul className="list-inline">Western</ul></button> */}

//           </div>
//         </div>

//             <div style={{ width: '85%', margin: '1em auto' }} >

//                 <Title level={2} > Movies by latest </Title>
//                 <hr />
//                 <Row  gutter={[16, 16]}>
//                     {Movies && Movies.map((movie, index) => (
//                         <React.Fragment  key={index}>
//                             <GridCard 
//                                 image={movie.poster_path ?
//                                     `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
//                                     : null}
//                                 movieId={movie.id}
//                                 movieName={movie.original_title}
//                             />
//                         </React.Fragment>
//                     ))}
//                 </Row>

//                 {Loading &&
//                     <div>Loading...</div>}

//                 <br />
//                 <div style={{ display: 'flex', justifyContent: 'center' }}>
//                     <button className="loadMore" onClick={loadMoreItems}>Load More</button>
//                 </div>
//             </div>

//         </div>
//     )
// }

// export default LandingPage

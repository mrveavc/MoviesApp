import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { MovieCard } from "./MovieCard";
import { firestore } from "../firebase";
import Similar from "./Similar";
// import WatchList from "./WatchList";

import { Link, Route, Switch } from "react-router-dom";

// import {Category} from "./Category"

// import axios from "axios";

export default function Watched({ match }) {
  // const { watched /*,deleteFav*/ } = useContext(AuthContext);
  const [fav, setFav] = useState([]);
  const { currentUser } = useContext(AuthContext);

  // const [loading, setLoading] = useState(false);
  useEffect(() => {  

    getFav();
  }); 
  function getFav() {
    // setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFav(items);
      // setLoading(false);
    });
  }



  const ref = firestore.collection("users").where("id", "==", currentUser.uid);
  // const ref = firestore.collection("users");

  // console.log(ref);

 
  // const numbers = [0,1,2];
  // if(loading){
  //   return  <h1>Loading</h1>
  // }
  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading" style={{ color: "white" }}>
            Watched Movies
          </h1>

          {/* <span className="count-pill">
            {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
          </span> */}
        </div>

        {fav.length > 0 ? (
          <div className="movie-grid">
            <div>
                     

              {fav.map((fav) => (
                <div key={fav.id}>
                 
                  <div  className="header">
                  <span className="count-pill">
                    {fav.f.length} {fav.f.length === 1 ? "Movie" : "Movies"}
                  </span></div>
                  {/*                 
                <h2>{fav.f[0].id}</h2>
                <h2>{fav.f[0].fav}</h2>

                <h2>{fav.f[0].name}</h2>
                <h2>{fav.f[0].poster}</h2> */}

                  {fav.f.slice().map((movie) => (
                    <Link  to={`/movie/${movie.fav}`}>
                      <MovieCard movie={movie} key={movie.id} type="watched" />
                    </Link>
                    // <MovieCard
                    //   movie={fav.f[number]}
                    //   key={fav.f[number].id}
                    //   type="watched"
                    // />
                  ))}
                  {/* <MovieCard movie={fav.f[1]} key={fav.f[1].id} type="watched" /> */}
                  {/* <MovieCard movie={fav} key={fav.id} type="watched" /> */}
                  {/* <MovieCard movie={school} key={school.id} type="watched" /> */}
                </div>
              ))}
              <br></br>
            </div>
            {/* {watched.map((item) => (
              <MovieCard movie={item} key={item.id} type="watched" />
            ))} */}
          </div>
        ) : (
          <h2 className="no-movies">No movies in your list! Add some!</h2>
        )}    
       <Switch>
          <Route path="/movie/:id" component={Similar} />
        </Switch>
      </div>
    </div>
  );
}

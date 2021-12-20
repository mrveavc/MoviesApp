import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { MovieCard } from "./MovieCard";
import { firestore } from "../firebase";
import Similar from "./Similar";

import { Link, Route, Switch } from "react-router-dom";


export default function Watched({ match }) {
  const [fav, setFav] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {  

    getFav();
  }); 
  function getFav() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFav(items);
    });
  }



  const ref = firestore.collection("users").where("id", "==", currentUser.uid);


 
  return (
    <div className="movie-page">
      <div className="container">
        <div className="header">
          <h1 className="heading" style={{ color: "white" }}>
            Watched Movies
          </h1>

        
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
                 

                  {fav.f.slice().map((movie) => (
                    <Link  to={`/movie/${movie.fav}`}>
                      <MovieCard movie={movie} key={movie.id} type="watched" />
                    </Link>
                    
                  ))}
                
                </div>
              ))}
              <br></br>
            </div>
           
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

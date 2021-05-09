import React, { useContext,useState,useEffect} from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { MovieCard } from "./MovieCard";
import { firestore } from "../firebase";
import firebase from "firebase/app";

export const MovieControls = ({ type, movie }) => {
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    // moveToWatchlist,
    // removeFromWatched,
  /*   deleteFav */
  currentUser
  } = useContext(AuthContext);
  const [b, setFav] = useState([]);
   
  const ref = firestore.collection("users").where("id", "==", currentUser.uid);
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
  /* function deleteFav(a) { 

     
      b.map((b) => (
                 
           
               
        b.f.slice().map((movie) => (
        a.fav===movie.fav ? (
              console.log(a.fav,movie.fav),
              console.log(movie),
              firestore.collection('users').doc(currentUser.uid).update({
                f:firebase.firestore.FieldValue.arrayUnion(movie)
              })
              firestore.collection('users').where('f','array-contains',movie.fav).delete()
              firebase.firestore()
.collection('users')
.doc(currentUser.uid)
.delete(
  { f: [{fav:a.fav}] },
  { f: [{ who: "1" }] }, 
  
)
              firestore.collection('users').doc(currentUser.uid).update({
                f: firebase.firestore.FieldValue.arrayUnion().delete(movie.fav)
               
                })
            ):(
            <></>
            )
        
      
        
        ))
      
    
    ))
  
    
     } */
     function del(movie){
      
           firebase.firestore().collection('users').doc(currentUser.uid).update({
              f: firebase.firestore.FieldValue.arrayRemove(movie)
          });
          
         
     
  }
  return (
    <div className="inner-card-controls">
     {/*  {type === "watchlist" && (
        <>
          <button className="ctrl-btn" onClick={() => addMovieToWatched(movie)}>
            <i className="fa-fw far fa-eye"></i>
          </button>

          <button
            className="ctrl-btn"
            onClick={() => removeMovieFromWatchlist(movie.id)}
          >
            {console.log(movie.id)}
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )} */}

      {type === "watched" && (
        <>
          {/* <button className="ctrl-btn" onClick={() => moveToWatchlist(movie)}>
            <i className="fa-fw far fa-eye-slash"></i>
          </button> */}

          <button
            className="ctrl-btn"
            onClick={()=>del(movie) /*removeFromWatched(movie.id)*/}
          >
                       
            <i className="fa-fw fa fa-times"></i>
          </button>
        </>
      )}
    </div>
  );
};

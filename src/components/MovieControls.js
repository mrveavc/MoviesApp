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
   
  currentUser
  } = useContext(AuthContext);
  const [b, setFav] = useState([]);
   
  const ref = firestore.collection("users").where("id", "==", currentUser.uid);
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
 
     function del(movie){
      
           firebase.firestore().collection('users').doc(currentUser.uid).update({
              f: firebase.firestore.FieldValue.arrayRemove(movie)
          });
          
         
     
  }
  return (
    <div className="inner-card-controls">

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

import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  // useReducer,
} from "react";
import { auth, firestore } from "../firebase";

import { useHistory ,Link} from "react-router-dom";
// import axios from "axios";
// import AppReducer from "./AppReducer";
import firebase from "firebase/app";
/* import { gecici } from "../components/gecici"; */

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// const initialState = {
//   watchlist: localStorage.getItem("watchlist")
//     ? JSON.parse(localStorage.getItem("watchlist"))
//     : [],
//   watched: localStorage.getItem("watched")
//     ? JSON.parse(localStorage.getItem("watched"))
//     : [],
// };

// // create context
// export const GlobalContext = createContext(initialState);

// provider components

export function AuthProvider({ children }) {
  // const [state, dispatch] = useReducer(AppReducer, initialState);

  const [hiddenMenu, setHiddenMenu] = useState(true);

  const [activeLink, setActiveLink] = useState("Filmler"); //İLK FİLMLERİ ACTİVE ETTİM

  const [showPagination, setShowPagination] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1); // SAYFA BİRDEN BAŞLAR

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const API_KEY = "9d4fbae6d45a1f406cc115a66a4de03d";
  const [fav, setFav] = useState([]);
  const ref = firestore.collection("users");

  // function add(newSchool) {
  //   // let a=0;

  //   ref.doc(currentUser.uid).set({
  //     id:currentUser.uid,
  //     fav: newSchool.id,
  //     name:newSchool.title,
  //     poster:newSchool.poster,

  //     // Array: [newSchool.id,newSchool.title,newSchool.poster],

  //   })
  //     //.doc() use if for some reason you want that firestore generates the id
  //     // .doc(newSchool.id)
  //     // .set(newSchool)
  //     // .then(() => {
  //     //   setFav((prev) => [newSchool, ...prev]);
  //     // })
  //     // .catch((err) => {
  //     //   console.error(err);
  //     // });
  // }

  const add = async (newSchool) => {
    // let myArray = [currentUser.uid,newSchool.id,newSchool.title,newSchool.poster];
    // dispatch({ type: "MOVE_TO_WATCHLIST", payload: newSchool });

    try {
      await ref.doc(currentUser.uid).update({
        // [a]: firebase.firestore.FieldValue.arrayUnion({uid:currentUser.uid,fav:newSchool.id,name:newSchool.title,poster:newSchool.poster})
        f: firebase.firestore.FieldValue.arrayUnion({
          id: currentUser.uid,
          fav: newSchool.id,
          name: newSchool.title,
          poster: newSchool.poster,
        }),
        id: currentUser.uid,
        fav: newSchool.id,
        name: newSchool.title,
        poster: newSchool.poster,

        // a: firebase.firestore.FieldValue.arrayUnion(currentUser.uid,newSchool.id,newSchool.title,newSchool.poster)
      });
    } catch {
      console.error("An error has occured while adding an author");
    }
  };

 // function deleteFav(a) { 
    

  /*  firestore.collection('users').doc(currentUser.uid).update({
        f: firebase.firestore.FieldValue.delete()
       
       
        
    
}); */
    
   /*  firestore.collection('users').doc(currentUser.uid).update({
        fav: firebase.firestore.FieldValue.delete()
       
       
        
    
}); */
 /*   
    ref
      .doc()
      .delete()
      .then(() => {
        setFav((prev) => prev.filter((element) => element.fav !== movie.fav));
      })
      .catch((err) => {
        console.error(err);
      }); */
 // }
 

  const getMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
    );
    const data = await response.json();
    if (search.trim() === "") {
      setMovies(data);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (search.trim() === "") {
      return;
    }
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${currentPage}`
    );
    const searchData = await searchResponse.json();
    setMovies(searchData);
    setShowPagination(false);
  };
  const [setError] = useState("");
  const history = useHistory();

  async function handleLogout() {
    try {
      logout();

      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const newPage = (direction) => {
    //NEXT - PREVİOUS
    if (direction === "next") {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
    } else if (direction === "previous" && currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setShowPagination(true); // NEXT VE PREVIOS u altta gösterir
    }

    getMovies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, currentPage]);

  useEffect(() => {
    //SAYFALAR ARASI GEÇİŞTEKİ EFEKT
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(loadingTimeout);
  }, [movies, currentPage]);

  function signup(email, password) {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return firestore.collection("users").doc(cred.user.uid).set({
        fav: null,
        // id:null,
        // fav: null,
        // name:null,
        // poster:null,
      });
    });

    // return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
  //   // localStorage.setItem("watched", JSON.stringify(state.watched));
  // }, [state]);

  // // actions
  // const addMovieToWatchlist = (movie) => {
  //   dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  // };

  // const removeMovieFromWatchlist = (id) => {
  //   dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  // };
  // // // const ref = firestore.collection("users");

  // // const addMovieToWatched = (movie) => {
  // //   // ref.doc(movie.id).set(movie).catch((err)=>{
  // //   //   console.error(err);
  // //   // })
  // //   dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  // // };

  // const moveToWatchlist = (movie) => {
  //   dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  // };

  // const removeFromWatched = (id) => {
  //   dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  // };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    fav,
    add,
/*     deleteFav,
 */    movies,
    setMovies,
    search,
    setSearch,
    activeLink,
    setActiveLink,
    handleSearch,
    currentPage,
    setCurrentPage,
    newPage,
    showPagination,
    setShowPagination,
    isLoading,
    setIsLoading,

    hiddenMenu,
    setHiddenMenu,
    handleLogout,
    loading,
    // nowPlaying,
    // genreList,

    // movieByGenre,
    // fetchMovieDetail,
    // fetchMovieVideos,
    // fetchCasts,
    // fetchSimilarMovie,
    // setDetail,
    // setVideo,
    // setCasts,
    // setSimilarMovie,
    // detail,
    // setIsOpen,
    // video,
    // casts,
    // similarMovie,
    // isOpen,
    // watchlist: state.watchlist,
    // watched: state.watched,
    // addMovieToWatchlist,
    // removeMovieFromWatchlist,
    // addMovieToWatched,
    // moveToWatchlist,
    // removeFromWatched,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

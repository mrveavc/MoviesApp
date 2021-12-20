import React, {
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { auth, firestore } from "../firebase";

import { useHistory ,Link} from "react-router-dom";

import firebase from "firebase/app";


export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}


export function AuthProvider({ children }) {
 

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

  

  const add = async (newSchool) => {
    

    try {
      await ref.doc(currentUser.uid).update({
     
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

      
      });
    } catch {
      console.error("An error has occured while adding an author");
    }
  };

 

 
 

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
   
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(loadingTimeout);
  }, [movies, currentPage]);

  function signup(email, password) {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return firestore.collection("users").doc(cred.user.uid).set({
        fav: null,
        
      });
    });

 
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
    movies,
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

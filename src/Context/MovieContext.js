// import React, { useState, createContext, useEffect } from "react";
// // import fire from "../fire";
// // import Login from '../components/Login/Login';

// // import { auth } from "../fire"

// export const MovieContext = createContext();

// export const MovieState = ({ children }) => {

//   const [hiddenMenu, setHiddenMenu] = useState(true);

//   const [activeLink, setActiveLink] = useState("Filmler");  //İLK FİLMLERİ ACTİVE ETTİM

//   const [showPagination, setShowPagination] = useState(true);

//   const [isLoading, setIsLoading] = useState(false);

//   const [movies, setMovies] = useState([]);

//   const [search, setSearch] = useState("");
 
//   const [currentPage, setCurrentPage] = useState(1); // SAYFA BİRDEN BAŞLAR


//   const API_KEY = "9d4fbae6d45a1f406cc115a66a4de03d";

//   const getMovies = async () => {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage}`
//     );
//     const data = await response.json();
//     if (search.trim() === "") {
//       setMovies(data);
//     }
//   };

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     if (search.trim() === "") {
//       return;
//     }
//     const searchResponse = await fetch(
//       `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=${currentPage}`
//     );
//     const searchData = await searchResponse.json();
//     setMovies(searchData);
//     setShowPagination(false);
//   };

//   const newPage = (direction) => {      //NEXT - PREVİOUS 
//     if (direction === "next") {
//       setCurrentPage(currentPage + 1);
//       setIsLoading(true);
//     } else if (direction === "previous" && currentPage !== 1) {
//       setCurrentPage(currentPage - 1);
      
//     }
//   };


//   useEffect(() => {
//     if (search.trim() === "") {
//       setShowPagination(true); // NEXT VE PREVIOS u altta gösterir
//     }
    
//     getMovies();
    
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [search, currentPage]);

//   useEffect(() => {        //SAYFALAR ARASI GEÇİŞTEKİ EFEKT
//     const loadingTimeout = setTimeout(() => {
//       setIsLoading(false);
//     }, 300);
//     return () => clearTimeout(loadingTimeout);
//   }, [movies, currentPage]);

//   return (
//     <MovieContext.Provider
      
//       value={{
        
//         movies,
//         setMovies,
//         search,
//         setSearch,
//         activeLink,
//         setActiveLink,
//         handleSearch,
//         currentPage,
//         setCurrentPage,
//         newPage,
//         showPagination,
//         setShowPagination,
//         isLoading,
//         setIsLoading,
       
//         hiddenMenu,
//         setHiddenMenu,
       
        
//       }}
      
//     >
       
//       {children}
//     </MovieContext.Provider>
//   );
// };














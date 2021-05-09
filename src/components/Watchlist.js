// import React, { useContext } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import { MovieCard } from "./MovieCard";
// import { Link, Route, Switch } from "react-router-dom";
// import Similar from "./Similar";
// export default function  Watchlist ()  {
//   const { watchlist } = useContext(AuthContext);
//   const  MyComponent=()=>{
//     return (
//       <>
//          <Switch>
//          <Route path="/movie/:id" component={Similar} />
//          </Switch>
//       </>
//     );
//   };
//   return (
//     <div className="movie-page">
//       <div className="container">
//         <div className="header">
//           <h1 className="heading"  style={{color:"white"}}>My Watchlist</h1>
//           <span className="count-pill">
//             {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
//           </span>
//         </div>
//         {watchlist.length > 0 ? (
//           <div className="movie-grid">
//             {watchlist.map((movie) => (
//               <Link  to={`/movie/${movie.id}`}>
//               <MovieCard  movie={movie} key={movie.id} type="watchlist" >
//                 </MovieCard>
              
//                </Link>
//             ))}
//           </div>
//         ) : (
//           <h2 className="no-movies">No movies in your list! Add some!</h2>
//         )}
//        </div>   
//       <MyComponent  />
      
//     </div>
    
//   );
// };

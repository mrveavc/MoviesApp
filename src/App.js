// import { MovieState } from "./Context/MovieContext";
// import Navi from "./components/Navi/Navi";
// import "./App.css";
// import React from "react";



// const App = () => {

//   return (
      
//     <MovieState>
      
     
//       <Navi />
//     </MovieState>
//   );
// };

// export default App;

import React from "react"

import { AuthProvider } from "./Context/AuthContext"
import { BrowserRouter as Router} from "react-router-dom"

import Navi from "./components/Navi/Navi";
import "./App.css";



function App() {
  return (
    
        <Router>
          
          <AuthProvider>
            
          <Navi></Navi>
          
          </AuthProvider>
        </Router>
     
  )
}

export default App
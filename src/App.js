

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

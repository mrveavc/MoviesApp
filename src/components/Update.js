/** @jsx jsx */
import {  jsx } from "@emotion/core";
import  { useState } from "react"
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom"
import {  Alert } from "react-bootstrap"


// import Login from "../../Login/Login";
// import Dashboard from "../../Dashboard";

export default function  Update () {
    const [error] = useState("")
    const { currentUser } = useAuth()
  
  return (
    <form >
     {error && <Alert variant="Secondary" >{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link  as="button" class="btn btn-secondary w-100 mt-3 " to="/update-profile" >
            Update Profile
          </Link>
     
    </form>
  );
};

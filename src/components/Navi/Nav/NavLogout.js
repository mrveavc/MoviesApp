/** @jsx jsx */
import {  jsx } from "@emotion/core";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { Link } from "react-router-dom"

// import Login from "../../Login/Login";
// import Dashboard from "../../Dashboard";

export default function  NavLogout () {
  const { handleLogout } = useContext(AuthContext);

  return (
    <form  onClick={handleLogout}>
     
          
        <div style={{}}>
          <Link    as="button"  class=" btn btn-secondary"             /* onChange={(e) => (e.target.handleLogout)}*/>
            Log Out
          </Link>
        </div>
     
    </form>
  );
};



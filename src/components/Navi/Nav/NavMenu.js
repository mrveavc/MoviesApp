import React from "react";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import NavLink from "./NavLink";


const NavMenu = () => {
  const { hiddenMenu,currentUser } = useContext(AuthContext);

  return (
    <div style={{paddingLeft:"80px"}} id="NavMenu" className={(hiddenMenu ? "hidden" : "") + " NavMenu"}>
      <NavLink btnText="Filmler" />
      <NavLink btnText="Category" />
     
      

      {currentUser ? (
        <> <NavLink btnText="Watched" />
     
      </>
      ) : (
        <>
        </>

      )}

    
      <NavLink className="log" btnText="Login"> 
        </NavLink>
    </div>
  );
};

export default NavMenu;

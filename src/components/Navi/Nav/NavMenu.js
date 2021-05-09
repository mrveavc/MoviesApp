import React from "react";

import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import NavLink from "./NavLink";

// import { firestore} from "../../../firebase";

const NavMenu = () => {
  const { hiddenMenu,currentUser } = useContext(AuthContext);

  return (
    <div style={{paddingLeft:"80px"}} id="NavMenu" className={(hiddenMenu ? "hidden" : "") + " NavMenu"}>
      <NavLink btnText="Filmler" />
      <NavLink btnText="Category" />
      {/* <NavLink btnText={firestore.collection('users').get().then(snapshot=>{
        console.log(snapshot.docs)
      })}></NavLink> */}
      

      {currentUser ? (
        <> <NavLink btnText="Watched" />
      {/* <NavLink btnText="Watchlist" /> */}
      </>
      ) : (
        <>
        </>

      )}

      {/* <NavLink onClick={handleLogout}  btnText="Logout"> </NavLink> */}
      {/* {currentUser ? (
        <></>
      ) : (
       
      )} */}
        {/* {currentUser ? (
        <> </>
      ) : (
        <> <NavLink className="log" btnText="Login"> 
        </NavLink>
        </>

      )} */}

      <NavLink className="log" btnText="Login"> 
        </NavLink>
    </div>
  );
};

export default NavMenu;

import React  from "react"
import { Dropdown } from "react-bootstrap"
import NavLogout from "./Navi/Nav/NavLogout"
import Update from "./Update"

export default function Dashboard() {
 
  return (
    <>
   
      
      <Dropdown  /*style={{top:"22px",position:"absolute",width:"30%"}} */>
      <Dropdown.Toggle as="button" class="btn btn-secondary " id="dropdown-basic">
          Profile
      </Dropdown.Toggle> 
      <Dropdown.Menu >
        <div style={{backgroundColor:"#F5F5DC"}}> 
          <NavLogout  ></NavLogout>
          <Update></Update>
          </div>

        </Dropdown.Menu>
     </Dropdown>
    
    </>
  )
}

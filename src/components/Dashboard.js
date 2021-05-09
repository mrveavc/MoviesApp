import React  from "react"
import { Dropdown } from "react-bootstrap"
import NavLogout from "./Navi/Nav/NavLogout"
import Update from "./Update"

export default function Dashboard() {
  // const [error] = useState("")
  // const { currentUser } = useAuth()

 

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
      {/* <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div> */}
    </>
  )
}



// import React, { useState } from "react"
// import { Card, Alert } from "react-bootstrap"
// import { useAuth }  from "../Context/AuthContext"
// import { Link } from "react-router-dom"

// export default function Dashboard() {
//   const [error/*, setError*/] = useState("")
//   const { currentUser } = useAuth()
//   // const history = useHistory()
//   // const {handleLogout} = useContext(useAuth );


//   // async function handleLogout() {
//   //   setError("")
//   //   try {
//   //     await logout()
//   //     history.push("/login")
//   //   } catch {
//   //     setError("Failed to log out")
//   //   }
//   // }

//   return (
//     <>
//       <Card style={{right:'0px', position: 'relative'}}>
//         <Card.Body>
//           <h2 className="text-center mb-4">Profile</h2>
//           {error && <Alert variant="danger">{error}</Alert>}
//           <strong>Email:</strong> {currentUser.email}
//           <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
//             Update Profile
//           </Link>
//         </Card.Body>
//       </Card>
//       {/* <div className="w-100 text-center mt-2">
//         <Button className="logout" variant="link" style={{ backgroundColor: '#be2e3a' ,color:'white' }}{handleLogout}>
//           Log Out
//         </Button>
//       </div> */}
//     </>
//   )
// }
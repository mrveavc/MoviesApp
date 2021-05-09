// import React, { useContext } from "react";
// import { MovieContext } from "../../Context/MovieContext";
// import Container from "../GlobalComponents/Container";
// // import imag from "src/login.png";
// const Login = () => {
//   const {
//     email,
//     setEmail,
//     password,
//     setPassword,
//     handleLogin,
//     handleSignup,
//     hasAccount,
//     setHasAccount,
//     emailError,
//     passwordError,
//   } = useContext(MovieContext);

//   return (
//     <section className="Login">
//       <Container>
//        {/* <imag>
//        </imag> */}
//         <div className="loginContainer">
//           <label>Username</label>
//           <input
//             type="text"
//             autoFocus
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           ></input>
//           <p className="errorMsg"> {emailError}</p>
//           <label>Password</label>
//           <input
//             type="password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           ></input>
//           <p className="errorMsg"> {passwordError}</p>
//           <div className="btnContainer">
//             {hasAccount ? (
//               <>
//                 <button onClick={handleLogin} className="sign">Sign in</button>
//                 <p  className="account" >
//                   Don't have an account ?
//                   <span  onClick={() => setHasAccount(!hasAccount)}>
//                     Sign up
//                   </span>
//                 </p>
//               </>
//             ) : (
//               <>
//                 <button onClick={handleSignup} className="sign">Sign up</button>
//                 <p className="account">
                
//                   Have an account ?  <b/> <b/>
//                   <span onClick={() => setHasAccount(!hasAccount)}>
//                      Sign in
//                   </span>
//                 </p>
//               </>
//             )}
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// };

// export default Login;



import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../Context/AuthContext"
import { Link, useHistory } from "react-router-dom"


export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true) 
      

      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/bos")
              // YÖNLENDİRME
    } catch {
      setError("Oturum Açılamadı")
    }

    setLoading(false)
  }

  return (
    <>
   


     <Card style={{ backgroundColor: '#212529' , width: '100%' , height:'100%', border:' 2px solid #2c2e3a'}} className="login text-center"> 
        <Card.Body style={{ marginTop:'50px'}} className="text-center" >
          <h2 className="login">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form  style={{ marginTop: '55px' }} onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{ margin: '18px' ,fontWeight:'800'}}>Email</Form.Label>
              <Form.Control type="email"   ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{ margin : '3px',fontWeight:'800' }} >Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button  style={{ backgroundColor: '#be2e3a'  }}  disabled={loading}  type="submit">
              Login
            </Button>
          </Form>
          <div id="forgot">
            <Link style={{ marginLeft:'80px'}} className="forgot" to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      <div style={{ marginBottom:'200px',paddingLeft:'90px'}} className="w-100 text-center mt-2">
        Need an account? <Link  className="signup" to="/signup">Sign Up</Link>
      </div>
      </Card>
    </>
  )
}










































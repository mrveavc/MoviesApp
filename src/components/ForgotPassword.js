import React, { useRef, useState } from "react"
import { Form, Card, Alert } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
      <Card  style={{backgroundColor: '#212529' , width: '100%' , height:'89%', border:' 2px solid #2c2e3a',position:"absolute"}} className="login">
        <Card.Body style={{ marginLeft:"-50px",marginTop:'80px'}} className="text-center">
          <h2  style={{marginLeft:"20px"}} className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form style={{ marginTop: '55px' }} onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label  style={{ margin: '18px' ,fontWeight:'800'}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Link style={{color: "white",backgroundColor: "#be2e3a ",width: "44%",padding: "10px",margin: "8px 0",border: "none",cursor: "pointer",marginLeft: "80px"}} as="button"  class="btn btn-secondary "  disabled={loading} type="submit">
              Reset Password
            </Link>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link style={{ color:"white" ,marginLeft:"40px"}}  to="/login">Login</Link>
          </div>
        </Card.Body>
        <div  style={{marginBottom:'170px',paddingLeft:'30px'}}  className="w-100 text-center mt-2">
        Need an account? <Link  className="signup" to="/signup">Sign Up</Link>
      </div>
      </Card>
      
    </>
  )
}
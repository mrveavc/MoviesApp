import React, { useRef, useState } from "react"
import { Form,Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <Card style={{ backgroundColor: '#212529' , width: '100%' , height:'89%', border:' 2px solid #2c2e3a',position:"absolute"}}   className="login"> 
        <Card.Body style={{ marginTop:'50px'}}  className="text-center">
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form  style={{ marginTop: '55px' }} onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label  style={{ margin: '18px' ,fontWeight:'800'}}>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label  style={{ margin : '3px',fontWeight:'800' }}>Password</Form.Label>
              <Form.Control  placeholder="Leave blank to keep the same"  type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group   style={{ marginLeft:"-95px"}} id="password-confirm">
              <Form.Label  style={{ margin : '3px',fontWeight:'800'}}>Password Confirmation</Form.Label>
              <Form.Control   placeholder="Leave blank to keep the same"  style={{width:"42%"}} type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button  style={{color: "white",backgroundColor: "#be2e3a ",width: "44%",padding: "10px",margin: "8px 0",border: "none",cursor: "pointer",marginLeft: "80px"}}  class="btn btn-secondary "  disabled={loading} type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div  style={{marginBottom:'170px',paddingLeft:'30px'}}  className="w-100 text-center mt-2">
        Already have an account? <Link className="signup"  to="/login">Log In</Link>
      </div>
      </Card>
      
    </>
  )
}
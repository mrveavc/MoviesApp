import React, { useRef, useState } from "react"
import { Form,Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../Context/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/bos")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card style={{ backgroundColor: '#212529' , width: '100%' , height:'89%', border:' 2px solid #2c2e3a',position:"absolute"}}  className="login"> 
        <Card.Body style={{ marginTop:'50px'}} className="text-center">
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="Secondary">{error}</Alert>}
          <Form style={{ marginTop: '55px' }}  onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label style={{ margin: '18px' ,fontWeight:'800'}}>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label style={{ margin : '3px',fontWeight:'800'}}>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group  style={{ marginLeft:"-95px"}} id="password-confirm">
              <Form.Label  style={{ margin : '3px',fontWeight:'800'}}>Password Confirmation</Form.Label>
              <Form.Control style={{width:"42%"}}
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"  
              />
            </Form.Group>
            <Button style={{color: "white",backgroundColor: "#be2e3a ",width: "44%",padding: "10px",margin: "8px 0",border: "none",cursor: "pointer",marginLeft: "80px"}} class="btn btn-secondary "   disabled={loading} className="w-30" type="submit">
              
               Update 
             
            </Button>
          </Form>
        </Card.Body> 
        <div style={{marginBottom:'170px',paddingLeft:'90px'}} className="w-100 text-center mt-2">
        <Link style={{ color:"white"}} to="/bos">Cancel</Link>
        </div>
      </Card>
     
     
    </>
  )
}
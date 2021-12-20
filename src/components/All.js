import { Switch, Route } from "react-router-dom";
import React from "react";
import Dashboard from "./Dashboard";
import Login from "./Login/Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfil";
import Signup from "./Signup";
import Container from "./GlobalComponents/Container";


export default function All() {
  return (
    <Switch>
      <Container path="/bos"></Container>
      <PrivateRoute exact path="/" component={Dashboard} />
      <PrivateRoute path="/update-profile" component={UpdateProfile} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
    </Switch>
  );
}

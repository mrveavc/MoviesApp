import { css  } from "@emotion/core";
import React from "react"
import { useAuth } from "../../../Context/AuthContext"
// import {  Redirect } from "react-router-dom"
import Dashboard from "../../Dashboard";



const RightNav = ({  component: Component, ...rest }) => {
    const { currentUser } = useAuth()

    return (
        <div 
         className="wrapper" css={styles} 
       
        > 
        {currentUser ? (
           <Dashboard ></Dashboard>
          ):(
            <div></div>
          )}
          </div>
      )
    }

const styles = css`
  width: 10%;
  max-width: 20%;
  min-height: 100vh;
  background: #151728;
  .wrapper {
    height: 100vh;
    max-height: 86vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 12px;
    }
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px #272a3d;
      border-radius: 50px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 50px;
      background: #3f4152;
    }
  }
`;

export default RightNav;

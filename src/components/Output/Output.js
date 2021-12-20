/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import  { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Container from "../GlobalComponents/Container";
import Movies from "../Movies/Movies";


import MoviesPagination from "../Movies/MoviesPagination";
import All from "../All";

import Category from "../Category";
import Watched from "../Watched";


const Output = () => {
  const { activeLink } = useContext(AuthContext);

  return (
    <div css={styles} className="output">
      {activeLink === "Filmler" && (
        <Container>
         
            <Movies />
            <MoviesPagination />
         
        </Container>
      )}
       {activeLink === "Category" && (
        
     
        <Category></Category>  
        
        
 )}
  {activeLink === "Watched" && (
        
     
        <Watched></Watched>  
        
        
 )}
   {/* {activeLink === "Watchlist" && (
        
     
        <Watchlist></Watchlist>  
        
        
 )} */}
    
     
      {activeLink === "Login" && (
        
     
          <All></All>
          
      )}
      
    </div>
  );
};

const styles = css`
  width: 100%;
  min-height: calc(100vh - 80px);
  display: flex;
  > .container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  @media (max-width: 1365px) {
    > .container {
      max-width: 90%;
    }
  }
`;

export default Output;

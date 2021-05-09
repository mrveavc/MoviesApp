/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import Container from "../../GlobalComponents/Container";
import NavLogo from "./NavLogo";
import NavMenu from "./NavMenu";
import NavSearch from "./NavSearch";
import RightNav from "./RightNav";
// import NavLogout from "./NavLogout";


const Nav = () => {
  const { hiddenMenu, setHiddenMenu } = useContext(AuthContext);

  return (
    <nav css={styles}>
      <Container>
        <div className="wrapper">
          <NavLogo />
          <NavMenu />
        </div>
        <RightNav></RightNav>
       <NavSearch />
       
        <i
          onClick={() => setHiddenMenu(!hiddenMenu)}
          // id="burgerMenu"
          className={hiddenMenu ? "fas fa-bars" : "fas fa-times"}
        ></i>
      </Container>
    </nav>
  );
};

const styles = css`
  width: 100%;
  min-height: 80px;
  padding: 20px 0;
  background: #212229;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .wrapper {
      display: flex;
      align-items: center;
    }
    #burgerMenu {
      color: #f9a5ff;
      cursor: pointer;
      display: none;
    }
  }
  @media (max-width: 860px) {
    .container {
      #burgerMenu {
        display: block;
      }
    }
  }
  @media (max-width: 1365px) {
    .container {
      max-width: 90%;
    }
  }
`;

export default Nav;

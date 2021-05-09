/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const NavLink = ({ btnText }) => {
  const { activeLink, setActiveLink, setHiddenMenu } = useContext(AuthContext);

  return (
    <button
      style={{ color: activeLink === btnText ? "#be2e3a" : "#fff" }}
      css={styles}
      onClick={() => {
        setActiveLink(btnText);
        setHiddenMenu(true);
      }}
    >
      {btnText}
    </button>
  );
};

const styles = css`
  border: none;
  outline: none;
  background: transparent;
  font-size: 22px;
  margin-right: 24px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  @media (max-width: 860px) {
    font-size: 40px;
  }
`;

export default NavLink;

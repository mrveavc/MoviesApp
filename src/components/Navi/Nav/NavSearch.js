/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";

const NavSearch = () => {
  const { search, setSearch, handleSearch, activeLink } = useContext(
    AuthContext
  );

  return (
    <form css={styles} onSubmit={handleSearch}>
      {activeLink === "Filmler" && (
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
    </form>
  );
};

const styles = css`
  height: 40px;
  min-height: 40px;
  input {
    border: none;
    outline: none;
    border-radius: 50px;
    border: 1px solid #2c2f39;
    background: transparent;
    padding: 10px 16px;
    width: 260px;
    color: #be2e3a;
    &::placeholder {
      color: #be2e3a;
      letter-spacing: 1px;
    }
  }
  @media (max-width: 860px) {
    input {
      width: 220px;
    }
  }
`;

export default NavSearch;

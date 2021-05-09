/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Nav from "./Nav/Nav";
import Output from "../Output/Output";

const Navi = () => {
  return (
    <section css={styles} className="navi">
      <Nav />
      <Output />
    </section>
  );
};

const styles = css`
  width: 100%;
  min-height: 100vh;
  background: #1b1c22;
`;

export default Navi;

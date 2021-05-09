/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const NavLogo = () => <h2 css={styles}>MovieApp</h2>;

const styles = css`
  font-size: 22px;
  color: #be2e3a;
  font-weight: 900;
  user-select: none;
`;

export default NavLogo;

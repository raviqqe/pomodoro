import { css } from "@linaria/core";
import { black, lightBlue } from "./style/colors.js";

export const globalStyle = css`
  body {
    background: ${lightBlue};
    margin: 0;
    padding: 0;
    color: ${black};
    font-family: Roboto, sans-serif;
    line-height: 1.4;
    font-size: 16px;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`;

export const boxShadow = {
  boxShadow: "0rem 0.2rem 0.2rem rgba(0, 0, 0, 0.2)",
};

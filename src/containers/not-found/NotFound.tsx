import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { TEST_IDS } from "../../tests/test-ids";

function NotFound() {
  return (
    <RootContainer data-testid={TEST_IDS.CONTAINER_NOT_FOUND_ROOT}>
      <ImageContainer>
        <img
          width="250px"
          height="250px"
          src="./images/walle.png"
          alt="Wall-E sad face on the 404 page to say sorry"
        />
      </ImageContainer>
      <h1>Sorry, we didn't found this page!</h1>
      <p>
        You can go back to the <Link to="/">home page</Link> to find exciting
        stuff or hover Wall-E for a spin.
      </p>
    </RootContainer>
  );
}

export default NotFound;

const RootContainer = styled.div`
  padding-top: 40px;
  text-align: center;
`;

const spin = keyframes`
0% {
  transform: rotateZ(0deg);
}
100% {
  transform: rotateZ(360deg);
}
`;

const ImageContainer = styled.div`
  display: inline-block;
  cursor: pointer;
  &:hover {
    animation: 1s ${spin} ease-out infinite;
  }
`;

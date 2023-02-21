import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <StyledLayout>
      <StyledLoadingBar />
    </StyledLayout>
  );
};

export default Loading;

const StyledLayout = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLoadingBar = styled.div``;

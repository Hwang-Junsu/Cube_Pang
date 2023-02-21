import {RENDER} from "@/styles/theme";
import React from "react";
import styled from "styled-components";

const Modal = ({
  children,
  opacity = 0.1,
}: {
  children: React.ReactNode;
  opacity?: number;
}) => {
  return (
    <StyledLayout opacity={opacity}>
      <StyledContainer>{children}</StyledContainer>
    </StyledLayout>
  );
};

export default Modal;

const StyledLayout = styled.div<{opacity: number}>`
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  background-color: rgba(0, 0, 0, ${(props) => props.opacity});

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled.div`
  position: relative;
  width: 500px;
  height: 350px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  padding: 0px 50px;

  border-radius: 20px;
  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.glassmophism};
`;

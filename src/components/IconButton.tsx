import React from "react";
import styled from "styled-components";
import {tremblingAnimation} from "@/styles/animations";
import {RENDER} from "@/styles/theme";

interface IIconButtonProps {
  children: React.ReactNode;
  onClick?:
    | ((event: React.FormEvent<HTMLButtonElement>) => void)
    | (() => void);
  type?: "button" | "submit";
}

const IconButton = ({children, onClick, type = "button"}: IIconButtonProps) => {
  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default IconButton;

const StyledButton = styled.button`
  width: 50px;
  height: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;

  cursor: pointer;

  box-shadow: ${(props) => props.theme.boxShadow.normal};
  ${RENDER.glassmophism}

  &:active {
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    animation: ${tremblingAnimation()} 0.1s infinite;
  }

  &:hover {
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`;

import {RENDER} from "@/styles/theme";
import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Logo = () => {
  return (
    <StyledTitle>
      <Link href="/home">Cube Pang</Link>
    </StyledTitle>
  );
};

export default Logo;

const StyledTitle = styled.div`
  height: 100px;
  border-radius: 15px;

  width: 100%;

  font-size: 3rem;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  font-family: "Russo One", sans-serif;

  ${RENDER.textShadow}
  ${RENDER.glassmophism}
`;

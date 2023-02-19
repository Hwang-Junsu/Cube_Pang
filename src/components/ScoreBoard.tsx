import { GameManager } from "@/contexts/GameManager";
import { commaPerThousand } from "@/libs/client/utils";
import { RENDER } from "@/styles/theme";
import React, { useContext } from "react";
import styled from "styled-components";

const ScoreBoard = () => {
  const { score } = useContext(GameManager);

  return <StyledScoreBoard>Score | {commaPerThousand(score)}</StyledScoreBoard>;
};

export default ScoreBoard;

const StyledScoreBoard = styled.div`
  padding: 10px 20px;
  border-radius: 15px;

  text-align: center;
  font-weight: 600;
  color: white;
  text-shadow: 2px 4px 10px rgba(48, 57, 121, 0.69);
  font-size: 23px;

  white-space: nowrap;

  ${RENDER.glassmophism};
`;

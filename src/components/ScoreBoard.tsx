import React from "react";
import styled from "styled-components";
import {useGameManager} from "@/contexts/GameContext";
import {commaPerThousand} from "@/libs/client/utils";
import {RENDER} from "@/styles/theme";

const ScoreBoard = () => {
  const {score} = useGameManager();

  return (
    <StyledScoreBoard>
      <StyledScore>Score | {commaPerThousand(score)}</StyledScore>
    </StyledScoreBoard>
  );
};

export default ScoreBoard;

const StyledScoreBoard = styled.div`
  display: inline-block;
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

const StyledScore = styled.div``;

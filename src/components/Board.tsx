import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {v4 as uuid} from "uuid";
import {RENDER} from "@/styles/theme";
import {IBoardRenderProps} from "@/types/render";
import {useGameManager} from "@/contexts/GameContext";
import Block from "./Block";

const Board = () => {
  const {board, handleGameInit} = useGameManager();
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    setIsRender(true);

    return () => handleGameInit();
  }, [handleGameInit]);

  return (
    <StyledBoard>
      {isRender && (
        <>
          {board.map((lines, x) =>
            lines.map((block, y) => (
              <Block
                key={uuid()}
                x={x}
                y={y}
                color={block.color}
                value={block.value}
              />
            ))
          )}
        </>
      )}
    </StyledBoard>
  );
};

export default Board;

const StyledBoard = styled.div<IBoardRenderProps>`
  position: relative;
  border-radius: 30px;

  ${RENDER.boardSize};
  ${RENDER.glassmophism};
`;

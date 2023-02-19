import { RENDER } from "@/styles/theme";
import { IBoardRenderProps } from "@/types/render";
import { GameManager } from "@/contexts/GameManager";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import Block from "./Block";

const Board = () => {
  const { board } = useContext(GameManager);
  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    setIsRender(true);
  }, []);

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

  background: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);

  border-radius: 30px;
  box-shadow: ${(props) => props.theme.boxShadow.normal};

  ${RENDER.boardSize};
`;

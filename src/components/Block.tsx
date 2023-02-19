import React, { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { BLOCK_X_POSITION, BLOCK_Y_POSITION } from "@/constants/constants";
import { IBlockRenderProps } from "@/types/render";
import { v4 as uuid } from "uuid";
import { RENDER } from "@/styles/theme";
import { blockShakingAnimation, blockFadeOut } from "@/styles/animations";
import { IBlockProps } from "@/types/logic";
import { GameManager } from "@/contexts/GameManager";

const Block = ({ x, y, color, value }: IBlockProps) => {
  const { onSelect, firstChoice } = useContext(GameManager);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  useEffect(() => {
    if (value === "broken") setIsAnimated(true);
  }, []);

  useEffect(() => {
    if (firstChoice && x === firstChoice.x && y === firstChoice.y)
      setIsSelected(true);
    else setIsSelected(false);
  }, [firstChoice]);

  return (
    <StyledBlock
      key={uuid()}
      onClick={() => onSelect(x, y)}
      x={x}
      y={y}
      color={color}
      isSeletced={isSelected}
      isAnimated={isAnimated}
    ></StyledBlock>
  );
};

export default React.memo(Block);

const StyledBlock = styled.div<IBlockRenderProps>`
  position: absolute;

  background: ${(props) => props.color};
  border-radius: 15px;
  transform: translateX(${(props) => BLOCK_X_POSITION(props.x)}px)
    translateY(${(props) => BLOCK_Y_POSITION(props.y)}px);

  transition: all 0.5s ease-in-out;

  box-shadow: ${(props) => props.theme.boxShadow.block};
  ${RENDER.blockSize};

  ${(props) =>
    props.isSeletced &&
    css`
      animation: ${blockShakingAnimation(
          BLOCK_X_POSITION(props.x),
          BLOCK_Y_POSITION(props.y)
        )}
        0.4s infinite;
    `}
  ${(props) =>
    props.isAnimated &&
    css`
      animation: ${blockFadeOut(
          BLOCK_X_POSITION(props.x),
          BLOCK_Y_POSITION(props.y)
        )}
        0.3s ease-in-out;
    `}
  animation-fill-mode: forwards;
`;

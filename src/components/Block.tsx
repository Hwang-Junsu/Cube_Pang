import React, {useCallback, useContext, useEffect, useState} from "react";
import styled, {css} from "styled-components";
import {BLOCK_X_POSITION, BLOCK_Y_POSITION} from "@/constants/constants";
import {IBlockRenderProps} from "@/types/render";
import {v4 as uuid} from "uuid";
import {RENDER} from "@/styles/theme";
import {
  blockShakingAnimation,
  blockFadeOut,
  blockSwap,
} from "@/styles/animations";
import {IBlockProps} from "@/types/logic";
import {GameManager} from "@/contexts/GameManager";

const Block = ({x, y, color, value}: IBlockProps) => {
  const {onSelect, firstChoice, secondChoice} = useContext(GameManager);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const [direction, setDirection] = useState<number>(0); // 0 북, 1 동, 2 남, 3 서
  const [isSwap, setIsSwap] = useState<boolean>(false);

  useEffect(() => {
    if (
      firstChoice &&
      secondChoice &&
      x === firstChoice.x &&
      y === firstChoice.y
    ) {
      setIsSwap(true);
      const fx = firstChoice.x;
      const fy = firstChoice.y;
      const sx = secondChoice.x;
      const sy = secondChoice.y;

      if (fy < sy && fx === sx) setDirection(0);
      if (fy > sy && fx === sx) setDirection(2);
      if (fx < sx && fy === sy) setDirection(1);
      if (fx > sx && fy === sy) setDirection(3);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstChoice, secondChoice]);

  useEffect(() => {
    if (value === "broken") setIsAnimated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstChoice && x === firstChoice.x && y === firstChoice.y)
      setIsSelected(true);
    else setIsSelected(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstChoice]);

  if (secondChoice) console.log(direction);

  return (
    <StyledBlock
      key={uuid()}
      onClick={() => onSelect(x, y)}
      x={x}
      y={y}
      color={color}
      isSeletced={isSelected}
      isAnimated={isAnimated}
      isSwap={isSwap}
      direction={direction}
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
    ${(props) =>
    props.isSwap &&
    css`
      animation: ${blockSwap(
          BLOCK_X_POSITION(props.x),
          BLOCK_Y_POSITION(props.y),
          props.direction
        )}
        0.3s ease-in-out;
    `}
  animation-fill-mode: forwards;
`;

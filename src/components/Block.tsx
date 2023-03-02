import React, {useContext, useEffect, useState} from "react";
import {useSpring, animated} from "react-spring";
import styled, {css} from "styled-components";
import {BLOCK_X_POSITION, BLOCK_Y_POSITION} from "@/constants/constants";
import {IBlockRenderProps} from "@/types/render";
import {RENDER} from "@/styles/theme";
import {blockShakingAnimation, blockFadeOut} from "@/styles/animations";
import {IBlockProps} from "@/types/logic";
import {GameManager} from "@/contexts/GameContext";

const Block = ({x, y, color, value}: IBlockProps) => {
  const {onSelect, firstChoice, secondChoice} = useContext(GameManager);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [springProps, set] = useSpring(() => ({
    transform: `translate3d(${BLOCK_X_POSITION(x)}px, ${BLOCK_Y_POSITION(
      y
    )}px, 0)`,
  }));

  useEffect(() => {
    if (firstChoice && secondChoice) {
      if (x === firstChoice.x && y === firstChoice.y) {
        console.log(x, y);
        set({
          from: {
            transform: `translate3d(${BLOCK_X_POSITION(
              firstChoice.x
            )}px, ${BLOCK_Y_POSITION(firstChoice.y)}px, 0)`,
          },
          to: {
            transform: `translate3d(${BLOCK_X_POSITION(
              secondChoice.x
            )}px, ${BLOCK_Y_POSITION(secondChoice.y)}px, 0)`,
          },
          config: {mass: 1, tension: 500, friction: 30},
          reset: true,
        });
      }
      if (x === secondChoice.x && y === secondChoice.y) {
        set({
          from: {
            transform: `translate3d(${BLOCK_X_POSITION(
              secondChoice.x
            )}px, ${BLOCK_Y_POSITION(secondChoice.y)}px, 0)`,
          },
          to: {
            transform: `translate3d(${BLOCK_X_POSITION(
              firstChoice.x
            )}px, ${BLOCK_Y_POSITION(firstChoice.y)}px, 0)`,
          },
          config: {mass: 1, tension: 500, friction: 30},
          reset: true,
        });
      }
    }
  }, [secondChoice]);

  useEffect(() => {
    if (value === "broken") {
      setIsAnimated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    set({
      transform: `translate3d(${BLOCK_X_POSITION(x)}}px, ${BLOCK_Y_POSITION(
        y
      )}px, 0)`,
      config: {mass: 1, tension: 500, friction: 30},
    });
  }, [x, y, set]);

  useEffect(() => {
    if (firstChoice && x === firstChoice.x && y === firstChoice.y)
      setIsSelected(true);
    else setIsSelected(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstChoice]);

  return (
    <StyledBlock
      style={{
        ...springProps,
        border: isSelected ? "5px solid #FFF" : "none",
      }}
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

const StyledBlock = styled(animated.div)<IBlockRenderProps>`
  position: absolute;

  background: ${(props) => props.color};
  border-radius: 15px;
  /* transform: translateX(${(props) => BLOCK_X_POSITION(props.x)}px)
    translateY(${(props) => BLOCK_Y_POSITION(props.y)}px); */

  transition: all 0.5s ease-in-out;

  cursor: pointer;

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

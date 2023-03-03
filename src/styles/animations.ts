import {IBlockIndex} from "./../types/logic.d";
import {BLOCK_RENDER_SIZE} from "./../constants/constants";
import {keyframes} from "styled-components";

const direction = [
  [-BLOCK_RENDER_SIZE, 0],
  [0, BLOCK_RENDER_SIZE],
  [BLOCK_RENDER_SIZE, 0],
  [0, -BLOCK_RENDER_SIZE],
];

export const blockShakingAnimation = (x: number, y: number) => keyframes`
    0% {
        transform: translateX(${x}px) translateY(${y}px) rotate(10deg) scale(1.1);
    }
    50% {
        transform: translateX(${x}px) translateY(${y}px) rotate(-10deg) scale(1.1);
    }
    100% {
        transform: translateX(${x}px) translateY(${y}px) rotate(10deg) scale(1.1);
    }
`;

export const blockFadeOut = (x: number, y: number) => keyframes`
    from {
        transform: translateX(${x}px) translateY(${y}px) scale(1);
        opacity: 1;
    }
    to {
        transform: translateX(${x}px) translateY(${y}px) scale(1.1);
        opacity: 0;
    }
`;

export const blockTopDown = (x: number, y: number) => keyframes`
    from {
        transform: translateX(${x}px) translateY(${y - BLOCK_RENDER_SIZE}px);
    }
    to {
        transform: translateX(${x}px) translateY(${y}px);
    }
`;

export const blockSwap = (
  firstChoice: IBlockIndex,
  secondChoice: IBlockIndex
) => keyframes`
    from {
        transform: translateX(${firstChoice.x}px) translateY(${firstChoice.y}px);
    }
    to {
        transform: translateX(${secondChoice.x}px) 
        translateY(${secondChoice.y}px);
    }
`;

export const tremblingAnimation = () => keyframes`
    from {
        transform: translateX(-2px);
    }
    to {
        transform: translateX(2px);
    }
`;

export const appearAnimation = () => keyframes`
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        opacity: 1;
        transform: scale(1);
    }
    100% {
        transform: scale(10);
        opacity: 0;
    }
`;

import { BLOCK_RENDER_SIZE } from "./../constants/constants";
import { keyframes } from "styled-components";

export const blockShakingAnimation = (x: number, y: number) => keyframes`
    0% {
        transform: translateX(${x}px) translateY(${y}px) rotate(10deg);
    }
    50% {
        transform: translateX(${x}px) translateY(${y}px) rotate(-10deg);
    }
    100% {
        transform: translateX(${x}px) translateY(${y}px) rotate(10deg);
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

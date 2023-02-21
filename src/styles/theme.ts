import {BOARD_RENDER_SIZE} from "@/constants/constants";
import {BLOCK_RENDER_SIZE} from "./../constants/constants";
import {DefaultTheme} from "styled-components";

export const theme: DefaultTheme = {
  boxShadow: {
    normal:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    block:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
  },
};

export const RENDER = {
  textShadow: `
    text-shadow: 2px 4px 10px rgba(48, 57, 121, 0.69);
  `,
  boardSize: `
    width: ${BOARD_RENDER_SIZE}px;
    height: ${BOARD_RENDER_SIZE}px
  `,
  blockSize: `
    width: ${BLOCK_RENDER_SIZE}px;
    height: ${BLOCK_RENDER_SIZE}px;
  `,
  glassmophism: `
    background: rgba( 255, 255, 255, 0.50 );
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur( 4.5px );
    -webkit-backdrop-filter: blur( 4.5px );
    border: 1px solid rgba( 255, 255, 255, 0.18 );
  `,
};

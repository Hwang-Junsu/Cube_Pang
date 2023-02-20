export const BOARD_SIZE = 5;
export const BLOCK_GAP = 5; // px
export const BLOCK_RENDER_SIZE = 80; // px
export const BOARD_PADDING = 10; //px
export const BOARD_RENDER_SIZE =
  (BLOCK_RENDER_SIZE + BLOCK_GAP) * BOARD_SIZE + BOARD_PADDING * 2; // px
export const BLOCK_COLORS: any = {
  red: "linear-gradient(120deg, #f093fb 0%, #f5576c 100%)",
  blue: "linear-gradient(120deg, #4facfe 0%, #00f2fe 100%)",
  green: "linear-gradient(120deg, #43e97b 0%, #38f9d7 100%)",
  yellow: "linear-gradient(120deg, #fddb92 0%, #d1fdff 100%)",
  // purple: "linear-gradient(to top, #cd9cf2 0%, #f6f3ff 100%)",
};
export const COLORS = Object.keys(BLOCK_COLORS);
export const COLORS_LENGTH = COLORS.length;
export const BLOCK_X_POSITION = (x: number) =>
  BLOCK_RENDER_SIZE * x + BLOCK_GAP * x + BOARD_PADDING;
export const BLOCK_Y_POSITION = (y: number) =>
  BOARD_RENDER_SIZE -
  (BLOCK_RENDER_SIZE * (y + 1) + BLOCK_GAP * y + BOARD_PADDING);

import HowToPlay1 from "../../public/howtoplay1.png";
import HowToPlay2 from "../../public/howtoplay2.png";
import HowToPlay3 from "../../public/howtoplay3.png";
import HowToPlay4 from "../../public/howtoplay4.png";

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

export const PLAY_TIME = 60; // sec

export const COUNTDOWN_TIME = 3; // sec

export const HOW_TO_PLAY_DATA = [
  {
    image: HowToPlay1,
    descriptions: [
      "Game Start 클릭 시, 닉네임을 설정할 수 있습니다.",
      "닉네임은 랭킹보드에 올라갈 기록입니다.",
    ],
  },
  {
    image: HowToPlay2,
    descriptions: [
      "점수를 획득하기 위해서는 큐브를 이동시켜야 합니다.",
      "원하는 큐브를 옮겨 3개 이상 연속되게 만드세요!",
    ],
  },
  {
    image: HowToPlay3,
    descriptions: [
      "원하는 큐브를 골라주세요!",
      "상하좌우 한칸 이내로 움직일 수 있습니다!",
      "점수를 획득하지 못하는 자리는 움직이지 못해요!",
    ],
  },
  {
    image: HowToPlay4,
    descriptions: [
      "게임은 60초간 진행이 됩니다.",
      "60초 안에 최대한 많은 점수를 획득하세요!",
    ],
  },
];

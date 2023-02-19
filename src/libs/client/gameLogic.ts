import { IBlockColorWithIndex } from "./../../types/logic.d";
import { BOARD_SIZE } from "@/constants/constants";
import { IBlockColor, IBlockIndex } from "@/types/logic";

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

// 블록의 연속성을 평가.
export function isSequencial(
  board: IBlockColor[][],
  index1: IBlockIndex,
  index2: IBlockIndex
) {
  return board[index1.x][index1.y].value === board[index2.x][index2.y].value;
}

// 블록의 연속성을 평가.
export function isSequencialWithData(
  board: IBlockColor[][],
  index: IBlockIndex,
  _data: string
) {
  return board[index.x][index.y].value === _data;
}

// 방향에 따른 분석 및 저장
export function analyze(
  board: IBlockColor[][],
  index: IBlockColorWithIndex,
  dir: number,
  ignoreIndex?: IBlockColorWithIndex
) {
  const blocks: IBlockColorWithIndex[] = [];
  let nx = index.x + dx[dir];
  let ny = index.y + dy[dir];
  while (true) {
    if (nx < 0 || ny < 0 || nx >= BOARD_SIZE || ny >= BOARD_SIZE) break; // 범위를 나가면 멈춤
    if (!isSequencialWithData(board, { x: nx, y: ny }, index.value)) break; // 연속되지 않으면 멈춤
    if (nx === ignoreIndex?.x && ny === ignoreIndex?.y) break; // 무시해야하는 좌표와 동일하면서 밸류값이 다를 때 넘어가기
    blocks.push({ x: nx, y: ny, value: index.value });
    nx += dx[dir];
    ny += dy[dir];
  }
  return blocks;
}

export function analyzePuzzleBlock(
  board: IBlockColor[][],
  index: IBlockColorWithIndex,
  ignoreIndex?: IBlockColorWithIndex
) {
  let toBeDestroyedBlockIndex: IBlockIndex[] = [];

  for (let i = 0; i < 2; i++) {
    const line = [
      ...analyze(board, index, i, ignoreIndex),
      index,
      ...analyze(board, index, i + 2, ignoreIndex),
    ];
    if (line.length >= 3) {
      toBeDestroyedBlockIndex = [...line];
    }
  }
  return toBeDestroyedBlockIndex;
}

export function analyzeBoard(board: IBlockColor[][]) {
  let destoryedBlocks: IBlockIndex[] = [];
  let visited = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => false)
  );

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      if (visited[i][j]) continue;
      const blocks = analyzePuzzleBlock(board, {
        x: i,
        y: j,
        value: board[i][j].value,
      });
      blocks.forEach((block) => (visited[block.x][block.y] = true));

      destoryedBlocks = [...destoryedBlocks, ...blocks];
    }
  }
  return destoryedBlocks;
}

export function hasDestroyedBlock(
  board: IBlockColor[][],
  index1: IBlockColorWithIndex,
  index2: IBlockColorWithIndex
) {
  const swapIndex1 = { ...index1, value: index2.value };
  const swapIndex2 = { ...index2, value: index1.value };

  const toBeDestroyed = [
    ...analyzePuzzleBlock(board, swapIndex1, index2),
    ...analyzePuzzleBlock(board, swapIndex2, index1),
  ];

  return toBeDestroyed;
}

export function isPossilbeMove(
  index1: IBlockColorWithIndex,
  index2: IBlockColorWithIndex
) {
  for (let i = 0; i < 4; i++) {
    const nx = index1.x + dx[i];
    const ny = index1.y + dy[i];

    if (nx === index2.x && ny === index2.y) return true;
  }

  return false;
}

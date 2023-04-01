import {IBlockColorWithIndex} from "../../types/logic";
import {BOARD_SIZE} from "@/constants/constants";
import {IBlockColor, IBlockIndex} from "@/types/logic";

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
    if (!isSequencialWithData(board, {x: nx, y: ny}, index.value)) break; // 연속되지 않으면 멈춤
    if (ignoreIndex && nx === ignoreIndex.x && ny === ignoreIndex.y) break; // 무시해야하는 좌표일 때 멈춤
    blocks.push({x: nx, y: ny, value: index.value});
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
  for (let axis = 0; axis < 2; axis++) {
    const line = [
      ...analyze(board, index, axis, ignoreIndex),
      ...analyze(board, index, axis + 2, ignoreIndex),
    ];
    if (line.length >= 2) {
      line.forEach((block) => toBeDestroyedBlockIndex.push(block));
    }
  }
  if (toBeDestroyedBlockIndex.length > 0)
    toBeDestroyedBlockIndex.push({x: index.x, y: index.y});
  return toBeDestroyedBlockIndex;
}

export function analyzeBoard(board: IBlockColor[][]) {
  let destoryedBlocks: IBlockIndex[] = [];
  let visited = Array.from({length: BOARD_SIZE}, () =>
    Array.from({length: BOARD_SIZE}, () => false)
  );

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (visited[row][col]) continue;
      const blocks = analyzePuzzleBlock(board, {
        x: row,
        y: col,
        value: board[row][col].value,
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
  const swapIndex1 = {...index1, value: index2.value};
  const swapIndex2 = {...index2, value: index1.value};

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
  for (let dir = 0; dir < 4; dir++) {
    const nx = index1.x + dx[dir];
    const ny = index1.y + dy[dir];

    if (nx === index2.x && ny === index2.y) return true;
  }

  return false;
}

export interface IGameManagerProps {
  board: IBlockColor[][];
  firstChoice: Nullable<IBlockIndex>;
  secondChoice: Nullable<IBlockIndex>;
  onSelect: (x: number, y: number) => void;
  score: number;
  handleGameStart: () => void;
  handleGameInit: () => void;
  handleFetchRecord: (name: string, score: number) => Promise<void>;
  isGamePlay: boolean;
}

export interface ITimerContextProps {
  timer: number;
  handleTimerStart: () => void;
  handleCountDownStart: () => void;
  handleTimerInit: () => void;
  handleCountDownInit: () => void;
  startCount: number;
  isWorkTimer: boolean;
}

export interface IBlockIndex {
  x: number;
  y: number;
}

export interface IBlockColor {
  color: string;
  value: string;
  index: number;
}

export interface IBlockColorWithIndex extends IBlockColor {
  x: number;
  y: number;
  value: string;
  color?: string;
  index?: number;
}

export interface IBlockProps extends IBlockIndex {
  color: string;
  value: string;
}

export type FetchRecordParameter = (
  name: string,
  score: number
) => Promise<void>;

export type ConvertParameter = (blocks: IBlcokIndex[]) => void;

export type SwapParameter = (
  first: IBlockColorWithIndex,
  second: IBlockColorWithIndex
) => void;

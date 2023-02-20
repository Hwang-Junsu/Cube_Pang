export type Nullable<T> = T | null;

export interface Props {
  children: JSX.Element | JSX.Element[];
  handleStart?: () => void;
}

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

export interface IUserContextProps {
  name: string;
  handleName: (arg: string) => void;
  handleNameInit: () => void;
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

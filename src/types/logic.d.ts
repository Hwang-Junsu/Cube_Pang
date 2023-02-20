export type Nullable<T> = T | null;

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

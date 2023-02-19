export type Nullable<T> = T | null;

export interface IBlockIndex {
  x: number;
  y: number;
}

export interface IBlockColor {
  color: string;
  value: string;
}

export interface IBlockColorWithIndex extends IBlockColor {
  x: number;
  y: number;
  color?: string;
}

export interface IBlockProps extends IBlockIndex {
  color: string;
  value: string;
}

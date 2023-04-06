import {Record} from "@prisma/client";

export type Nullable<T> = T | null;

export interface Props {
  children: JSX.Element | JSX.Element[];
  handleStart?: () => void;
}

export interface IRecordProps {
  id?: number;
  name: string;
  score: number;
  ranking: number;
}

export interface IRecordResponse {
  data: IRecordProps[];
}

export interface IUserContextProps {
  name: string;
  handleName: (arg: string) => void;
  handleNameInit: () => void;
}

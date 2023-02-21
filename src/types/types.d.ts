import {Record} from "@prisma/client";

export type Nullable<T> = T | null;

export interface Props {
  children: JSX.Element | JSX.Element[];
  handleStart?: () => void;
}

export interface IRecordProps {
  name: string;
  score: number;
  ranking: number;
}

export interface IRecord {
  ok: boolean;
  records: Record[];
}

export interface IRecordResponse {
  data: IRecord;
}

export interface IUserContextProps {
  name: string;
  handleName: (arg: string) => void;
  handleNameInit: () => void;
}

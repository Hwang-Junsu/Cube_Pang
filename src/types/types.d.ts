import {Record} from "@prisma/client";

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

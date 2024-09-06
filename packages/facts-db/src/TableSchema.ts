import {TableObjects} from "./TableObjects";

export type TableSchema = {
  [K in keyof TableObjects]: "id";
};

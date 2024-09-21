import {Tables} from "./Tables";

export const dbSchema: Record<keyof Tables, string> = {
  facts: "++id, title, content",
  collections: "++id, name",
  labels: "++id, name",
};

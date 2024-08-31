import {FactsDbSchema} from "./FactsDbSchema";

export const schema: Record<keyof FactsDbSchema, string> = {
  facts: "++id, content",
};

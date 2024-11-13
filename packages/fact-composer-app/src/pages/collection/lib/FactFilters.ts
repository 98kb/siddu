import {Label} from "@repo/facts-db";

export type FactFilters = {
  labelId?: Label["id"];
  archived?: boolean;
};

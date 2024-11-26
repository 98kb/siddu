import {LabelSchema} from "@repo/collection-service-defs";

export type FactFilters = {
  labelId?: LabelSchema["_id"];
  isDeleted?: boolean;
};

import {IRepository} from "../../common/types/IRepository";
import {InsertLabelSchema} from "../schemas/InsertLabelSchema";
import {LabelSchema} from "../schemas/LabelSchema";
import type {LabelsQuerySchema} from "../schemas/LabelsQuerySchema";

export type ILabelsRepository = IRepository<
  LabelSchema,
  InsertLabelSchema,
  Omit<Partial<LabelSchema>, "_id">,
  LabelsQuerySchema
> & {
  isOrphan(id: LabelSchema["_id"]): Promise<boolean>;
  softDeleteIfOrphan(id: LabelSchema["_id"]): Promise<void>;
};

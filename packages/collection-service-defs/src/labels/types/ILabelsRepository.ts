import {ILabelsQuery} from "./ILabelsQuery";
import {IRepository} from "../../common/types/IRepository";
import {InsertLabelSchema} from "../schemas/InsertLabelSchema";
import {LabelSchema} from "../schemas/LabelSchema";

export type ILabelsRepository = IRepository<
  LabelSchema,
  InsertLabelSchema,
  Omit<Partial<InsertLabelSchema>, "_id">,
  ILabelsQuery
>;

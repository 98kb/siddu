import {type FactSchema} from "../schemas/FactSchema";
import {IRepository} from "../../common/types/IRepository";
import {InsertFactSchema} from "../schemas/InsertFactSchema";
import type {FactsQuerySchema} from "../schemas/FactsQuerySchema";

export type IFactsRepository = IRepository<
  FactSchema,
  InsertFactSchema,
  Omit<Partial<FactSchema>, "_id">,
  FactsQuerySchema
>;

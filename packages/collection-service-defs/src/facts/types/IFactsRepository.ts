import {type FactSchema} from "../schemas/FactSchema";
import {IFactsQuery} from "./IFactsQuery";
import {IRepository} from "../../common/types/IRepository";
import {InsertFactSchema} from "../schemas/InsertFactSchema";

export type IFactsRepository = IRepository<
  FactSchema,
  InsertFactSchema,
  Omit<Partial<FactSchema>, "_id">,
  IFactsQuery
>;

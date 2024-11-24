import {IdTypeSchema} from "../schema/IdTypeSchema";
import {PaginatedListSchema} from "../schema/PaginatedListSchema";
import type {QuerySchema} from "../schema/QuerySchema";

export interface IRepository<
  Entity extends IdTypeSchema,
  CreateRequest,
  UpdateRequest,
  QueryRequest extends QuerySchema,
> {
  create(request: CreateRequest): Promise<Entity>;
  get(request: IdTypeSchema["_id"]): Promise<Entity | undefined>;
  update(
    id: IdTypeSchema["_id"],
    request: UpdateRequest,
  ): Promise<Entity | undefined>;
  delete(id: IdTypeSchema["_id"]): Promise<void>;
  list(request: QueryRequest): Promise<Entity[]>;
  paginatedLst(request: QueryRequest): Promise<PaginatedListSchema<Entity>>;
  count(): Promise<number>;
}

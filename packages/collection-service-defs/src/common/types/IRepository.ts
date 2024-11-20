import type {IdTypeSchema} from "../schema/IdTypeSchema";
import type {QuerySchema} from "../schema/QuerySchema";

export interface IRepository<
  Entity extends IdTypeSchema,
  CreateRequest,
  UpdateRequest,
  QueryRequest extends QuerySchema,
> {
  create(request: CreateRequest): Promise<Entity>;
  get(request: IdTypeSchema["_id"]): Promise<Entity | undefined>;
  update(id: IdTypeSchema["_id"], request: UpdateRequest): Promise<Entity>;
  delete(id: IdTypeSchema["_id"]): Promise<void>;
  list(request: QueryRequest): Promise<Entity[]>;
}
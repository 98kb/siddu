import {IQuery} from "./IQuery";
import {IdType} from "./IdType";

export interface IRepository<
  Entity extends IdType,
  CreateRequest,
  UpdateRequest,
  QueryRequest extends IQuery,
> {
  create(request: CreateRequest): Promise<Entity>;
  get(request: IdType["_id"]): Promise<Entity | undefined>;
  update(id: IdType["_id"], request: UpdateRequest): Promise<Entity>;
  delete(id: IdType["_id"]): Promise<void>;
  list(request: QueryRequest): Promise<Entity[]>;
}

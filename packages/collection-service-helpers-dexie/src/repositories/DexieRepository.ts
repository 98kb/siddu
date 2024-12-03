// eslint-disable-next-line import/named
import {Collection, Dexie, EntityTable, IDType} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import type {
  BaseSchema,
  IRepository,
  IdTypeSchema,
  PaginatedListSchema,
  QuerySchema,
} from "@repo/collection-service-defs";

type Db<
  Entity extends string,
  EntitySchema extends IdTypeSchema,
  InsertEntity,
> = Dexie & Record<Entity, EntityTable<EntitySchema, "_id", InsertEntity>>;

export abstract class DexieRepository<
  Entity extends string,
  EntitySchema extends BaseSchema,
  CreateRequest,
  UpdateRequest,
  Query extends QuerySchema,
> implements IRepository<EntitySchema, CreateRequest, UpdateRequest, Query>
{
  constructor(
    readonly db: Db<Entity, EntitySchema, CreateRequest>,
    private entity: Entity,
  ) {}

  async create(request: CreateRequest): Promise<EntitySchema> {
    const id = await this.db[this.entity].add(request);
    return this.db[this.entity].get(id) as Promise<EntitySchema>;
  }

  get(id: IdTypeSchema["_id"]): Promise<EntitySchema | undefined> {
    return this.db[this.entity].get(id as any);
  }

  async update(
    id: IdTypeSchema["_id"],
    request: UpdateRequest,
  ): Promise<EntitySchema> {
    await this.db[this.entity].put({...request, _id: id} as CreateRequest);
    return this.db[this.entity].get(id as any) as Promise<EntitySchema>;
  }

  async delete(id: IdTypeSchema["_id"]): Promise<void> {
    await this.db[this.entity].delete(id as any);
  }

  list(query: Query): Promise<EntitySchema[]> {
    return this.toArray(query, this.paginate(query, this.filter(query)));
  }

  async paginatedList(
    request: Query,
  ): Promise<PaginatedListSchema<EntitySchema>> {
    const filtered = this.filter(request);
    const total = await filtered.count();
    const list = await this.toArray(request, this.paginate(request, filtered));
    return {
      ...request.pagination,
      total,
      list,
    };
  }

  count(): Promise<number> {
    return this.db[this.entity].count();
  }

  abstract toQueryPredicates(query: Query): Reader<EntitySchema, boolean>[];

  private filter(
    query: Query,
  ): Collection<EntitySchema, IDType<EntitySchema, "_id">, CreateRequest> {
    const predicates = this.toQueryPredicates(query);
    return this.db[this.entity].filter(record =>
      predicates.every(test => test(record)),
    );
  }

  private paginate(
    query: Query,
    result: Collection<EntitySchema, any, any>,
  ): Collection<EntitySchema, IDType<EntitySchema, "_id">, CreateRequest> {
    return result.limit(query.pagination.limit).offset(query.pagination.offset);
  }

  private toArray(
    query: Query,
    result: Collection<EntitySchema, any, any>,
  ): Promise<EntitySchema[]> {
    if (query.orderBy) {
      const isDescending = query.orderBy?.desc;
      return isDescending
        ? result.reverse().sortBy(query.orderBy.key)
        : result.sortBy(query.orderBy.key);
    }
    return result.toArray();
  }
}

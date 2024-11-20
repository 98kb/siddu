// eslint-disable-next-line import/named
import {Dexie, EntityTable} from "dexie";
import {Reader} from "fp-ts/lib/Reader";
import type {
  IRepository,
  IdTypeSchema,
  QuerySchema,
} from "@repo/collection-service-defs";

type Db<
  Entity extends string,
  EntitySchema extends IdTypeSchema,
  InsertEntity,
> = Dexie & Record<Entity, EntityTable<EntitySchema, "_id", InsertEntity>>;

export abstract class DexieRepository<
  Entity extends string,
  EntitySchema extends IdTypeSchema,
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
    const predicates = this.toQueryPredicates(query);
    return this.db[this.entity]
      .filter(record => predicates.every(test => test(record)))
      .limit(query.pagination.limit)
      .offset(query.pagination.offset)
      .toArray();
  }

  abstract toQueryPredicates(query: Query): Reader<EntitySchema, boolean>[];
}

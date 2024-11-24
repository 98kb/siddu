import {Reader} from "fp-ts/lib/Reader";
import sortBy from "lodash.sortby";
import type {
  IRepository,
  IdTypeSchema,
  QuerySchema,
} from "@repo/collection-service-defs";

export abstract class MemoryRepo<
  Entity extends string,
  EntitySchema extends IdTypeSchema,
  CreateRequest,
  UpdateRequest,
  Query extends QuerySchema,
> implements IRepository<EntitySchema, CreateRequest, UpdateRequest, Query>
{
  constructor(
    private entity: Entity,
    private data: Record<string, Record<IdTypeSchema["_id"], EntitySchema>>,
  ) {}

  async create(entity: CreateRequest): Promise<EntitySchema> {
    const _id = this.generateRandomAlphanumeric();
    this.data[this.entity] = this.data[this.entity] || {};
    this.data[this.entity][_id] = {_id, ...entity} as unknown as EntitySchema;
    return this.data[this.entity][_id];
  }

  async update(
    id: IdTypeSchema["_id"],
    updateRequest: UpdateRequest,
  ): Promise<EntitySchema | undefined> {
    if (!this.data[this.entity] || !this.data[this.entity][id]) {
      return undefined;
    }
    this.data[this.entity][id] = {
      ...this.data[this.entity][id],
      ...updateRequest,
    } as EntitySchema;
    return this.data[this.entity][id];
  }

  async delete(id: IdTypeSchema["_id"]): Promise<void> {
    delete this.data[this.entity][id];
  }

  async get(id: IdTypeSchema["_id"]): Promise<EntitySchema | undefined> {
    return this.data[this.entity]?.[id];
  }

  async list(query: Query): Promise<EntitySchema[]> {
    const predicates = this.toQueryPredicates(query);
    const data = Object.values(this.data[this.entity] || {});
    let result = data.filter(record => predicates.every(test => test(record)));
    if (query.orderBy) {
      result = sortBy(result, [query.orderBy.key]);
    }
    return result.slice(query.pagination.offset, query.pagination.limit);
  }

  abstract toQueryPredicates(query: Query): Reader<EntitySchema, boolean>[];

  private generateRandomAlphanumeric(): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

import {Reader} from "fp-ts/lib/Reader";
import sortBy from "lodash.sortby";
import type {
  BaseSchema,
  IRepository,
  IdTypeSchema,
  PaginatedListSchema,
  QuerySchema,
} from "@repo/collection-service-defs";

export abstract class MemoryRepo<
  Entity extends "facts" | "labels",
  EntitySchema extends BaseSchema,
  CreateRequest,
  UpdateRequest,
  Query extends QuerySchema,
> implements IRepository<EntitySchema, CreateRequest, UpdateRequest, Query>
{
  constructor(
    private entity: Entity,
    protected data: Record<string, Record<IdTypeSchema["_id"], EntitySchema>>,
  ) {}

  async create(entity: CreateRequest): Promise<EntitySchema> {
    const _id = this.generateRandomAlphanumeric();
    this.data[this.entity] = this.data[this.entity] || {};
    this.data[this.entity][_id] = {
      _id,
      ...entity,
      createAt: Date.now(),
      updatedAt: Date.now(),
    } as unknown as EntitySchema;
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
      updatedAt: Date.now(),
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
    return this.paginate(query, this.sort(query, this.filter(query)));
  }

  async paginatedList(
    request: Query,
  ): Promise<PaginatedListSchema<EntitySchema>> {
    const total = this.filter(request).length;
    const list = await this.list(request);
    return {
      ...request.pagination,
      total,
      list,
    };
  }

  async count(): Promise<number> {
    return Object.keys(this.data[this.entity]).length;
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

  private filter(request: Query): EntitySchema[] {
    const predicates = this.toQueryPredicates(request);
    const data = Object.values(this.data[this.entity] || {});
    return data.filter(record => predicates.every(test => test(record)));
  }

  private sort(request: Query, result: EntitySchema[]): EntitySchema[] {
    if (request.orderBy) {
      return sortBy(result, [request.orderBy.key]);
    }
    return result;
  }

  private paginate(request: Query, result: EntitySchema[]): EntitySchema[] {
    return result.slice(request.pagination.offset, request.pagination.limit);
  }
}

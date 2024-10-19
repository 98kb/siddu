import {Collection} from "../models/Collection";
import {
  LimitOffset,
  LimitOffsetDto,
} from "./../../../common/dto/LimitOffsetDto";
import {ListFactsInput} from "../dto/ListFactsInputDto";
import {TCollectionSchema} from "../schemas/CollectionSchema";
import {TFactSchema} from "../schemas/FactSchema";

export class CollectionService {
  async list({limit, offset}: LimitOffset): Promise<TCollectionSchema[]> {
    const collections = await Collection.find()
      .select({facts: false})
      .limit(Math.min(limit, LimitOffsetDto.shape.limit.maxValue ?? 1))
      .skip(offset)
      .lean();
    return collections.map(({_id, name}) => ({
      _id: _id.toString(),
      name,
    }));
  }

  async get(id: string): Promise<TCollectionSchema | undefined> {
    const collection = await Collection.findById(id)
      .select({facts: false})
      .lean();
    return collection
      ? {
          _id: collection._id.toString(),
          name: collection.name,
        }
      : undefined;
  }

  async listFacts({
    collectionId,
    limit,
    offset,
  }: ListFactsInput): Promise<TFactSchema[]> {
    const collection = await Collection.findById(collectionId)
      .select({facts: {$slice: [offset, limit]}})
      .lean();
    return (
      collection?.facts.map(({content, title}) => ({
        content,
        title,
      })) ?? []
    );
  }
}

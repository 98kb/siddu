import {Collection} from "../models/Collection";
import {LimitOffset} from "./../../../common/dto/LimitOffsetDto";
import {ListFactsInput} from "../dto/ListFactsInputDto";

export class CollectionService {
  list({limit, offset}: LimitOffset) {
    return Collection.find()
      .select("~facts name")
      .limit(limit)
      .skip(offset)
      .lean();
  }

  get(id: string) {
    return Collection.findById(id).select("~facts name").lean();
  }

  listFacts({collectionId, limit, offset}: ListFactsInput) {
    return Collection.findById(collectionId)
      .select({facts: {$slice: [offset, limit]}})
      .lean();
  }
}

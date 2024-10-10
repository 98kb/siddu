import {Collection} from "../models/Collection";

export class CollectionService {
  list() {
    return Collection.find().select("~facts name");
  }
}

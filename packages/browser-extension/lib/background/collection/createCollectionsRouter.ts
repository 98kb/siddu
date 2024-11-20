import {
  CollectionDB,
  FactsRepository,
  LabelsRepository,
} from "@repo/collection-service-helpers-dexie";
import {createServiceRouter} from "@repo/collection-service-trpc-factory";

export const createCollectionsRouter = (db: CollectionDB) => {
  const factsRepository = new FactsRepository(db, "facts");
  const labelsRepository = new LabelsRepository(db, "labels");
  return createServiceRouter(factsRepository, labelsRepository);
};

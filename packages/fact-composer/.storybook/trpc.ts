import {indexedDB, IDBKeyRange} from "fake-indexeddb";
import {
  createCollectionDB,
  FactsRepository,
  LabelsRepository,
} from "@repo/collection-service-helpers-dexie";
import {
  createServiceRouter,
  transformer,
} from "@repo/collection-service-trpc-factory";
import {createHTTPServer} from "@trpc/server/adapters/standalone";
import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import cors from "cors";

const createCollectionsRouter = () => {
  const db = createCollectionDB("collections-sb", {indexedDB, IDBKeyRange});
  const factsRepository = new FactsRepository(db);
  const labelsRepository = new LabelsRepository(db, factsRepository);
  return createServiceRouter(factsRepository, labelsRepository);
};

const router = createCollectionsRouter();

export const dummyCollection = createTRPCProxyClient<typeof router>({
  transformer,
  links: [
    httpBatchLink({
      url: "http://localhost:4444",
      // You can pass any HTTP headers you wish here
    }),
  ],
});

export const startCollectionServer = () => {
  return createHTTPServer({
    middleware: cors(),
    router,
    createContext: () => ({}),
  }).listen(4444);
};

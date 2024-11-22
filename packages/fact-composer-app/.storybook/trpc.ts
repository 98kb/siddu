import {
  FactsRepository,
  LabelsRepository,
} from "@repo/collection-service-helpers-memory";
import {
  createServiceRouter,
  transformer,
} from "@repo/collection-service-trpc-factory";
import {createHTTPServer} from "@trpc/server/adapters/standalone";
import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";
import cors from "cors";

const createCollectionsRouter = () => {
  const db = {};
  const factsRepository = new FactsRepository("facts", db);
  const labelsRepository = new LabelsRepository("labels", db);
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

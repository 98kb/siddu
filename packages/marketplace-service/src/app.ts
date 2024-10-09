import * as trpcExpress from "@trpc/server/adapters/express";
import {createAppRouter} from "./createAppRouter";
import {createContextInner} from "./lib/createContextInner";
import {expressHandler} from "trpc-playground/handlers/express";
import express from "express";

const trpcApiEndpoint = "/trpc";
const playgroundEndpoint = "/dev";

const router = createAppRouter();
const app = express();
app.use(
  trpcApiEndpoint,
  trpcExpress.createExpressMiddleware({
    router,
    createContext: createContextInner,
  }),
);

app.use(
  playgroundEndpoint,
  await expressHandler({
    trpcApiEndpoint,
    playgroundEndpoint,
    router,
    request: {
      superjson: true,
    },
  }),
);
export {app};

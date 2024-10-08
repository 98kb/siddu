import * as trpcExpress from "@trpc/server/adapters/express";
import {createAppRouter} from "./createAppRouter";
import {createContextInner} from "./lib/createContextInner";
import {env} from "./env";
import {renderTrpcPanel} from "trpc-panel";
import express, {Request, Response} from "express";

const router = createAppRouter();
const app = express();
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router,
    createContext: createContextInner,
  }),
);

app.use("/dev", (_: Request, res: Response) => {
  return res.send(
    renderTrpcPanel(router, {url: `http://localhost:${env.PORT}/trpc`}),
  );
});
export {app};

import {AppRouter} from "../../src/service/AppRouter";
import {DbClient} from "../../src/DbClient";
import {WebSocketServer} from "ws";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import {createAppRouter} from "../../src/service/routers/createAppRouter";
import {createHTTPServer} from "@trpc/server/adapters/standalone";
import {createMemoryAdapter} from "../../src/adapters/createMemoryAdapter";
import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  splitLink,
  wsLink,
} from "@trpc/client";
import {transformer} from "../../src/service/lib/transformer";

// TODO: find a way to use headless chrome for this and use createRuntimeClientChromeServer and createRuntimeClientChromeClient instead
export const createTestServer = () => {
  const router = createAppRouter(new DbClient(createMemoryAdapter));
  const {server, listen} = createHTTPServer({router});

  const wss = new WebSocketServer({server});
  applyWSSHandler<AppRouter>({wss, router});
  return {server, listen};
};

export const createTestClient = (port: number) => {
  const wsClient = createWSClient({url: `ws://localhost:${port}`});

  return createTRPCProxyClient<AppRouter>({
    links: [
      splitLink({
        condition(op) {
          return op.type === "subscription";
        },
        true: wsLink({
          client: wsClient,
        }),
        false: httpLink({url: `http://localhost:${port}`}),
      }),
    ],
    transformer,
  });
};

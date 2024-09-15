import {
  AppRouter,
  createAppRouter,
  transformer,
} from "@repo/facts-service-trpc";
import {FactsService, createMemoryAdapter} from "../../src";
import {WebSocketServer} from "ws";
import {applyWSSHandler} from "@trpc/server/adapters/ws";
import {createHTTPServer} from "@trpc/server/adapters/standalone";
import {
  createTRPCProxyClient,
  createWSClient,
  httpLink,
  splitLink,
  wsLink,
} from "@trpc/client";

const port = 3333;

// TODO: find a way to use headless chrome for this and use createRuntimeClientChromeServer and createRuntimeClientChromeClient instead
export const createTestServer = () => {
  const router = createAppRouter(new FactsService(createMemoryAdapter));
  const {server, listen} = createHTTPServer({router});

  const wss = new WebSocketServer({server});
  applyWSSHandler<AppRouter>({wss, router});
  listen(port);
  return server;
};

export const createTestClient = () => {
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

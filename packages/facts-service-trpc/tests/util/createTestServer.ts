import {AppRouter, createAppRouter, transformer} from "../../src";
import {FactsService, createMemoryAdapter} from "@repo/facts-service";
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

// TODO: find a way to use headless chrome for this and use createRuntimeClientChromeServer and createRuntimeClientChromeClient instead
export const createTestServer = () => {
  const router = createAppRouter(new FactsService(createMemoryAdapter));
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

// content.ts
import {chromeLink} from "trpc-chrome/link";
import {createTRPCProxyClient} from "@trpc/client";
import {transformer} from "./lib/transformer";

import type {AppRouter} from "./AppRouter";

export const createChromeAuthRuntimeClient = () => {
  const port = chrome.runtime.connect();
  return createTRPCProxyClient<AppRouter>({
    transformer,
    links: [chromeLink({port})],
  });
};

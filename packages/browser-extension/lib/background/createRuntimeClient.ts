import {backgroundRouter} from "./backgroundRouter";
import {chromeLink} from "trpc-chrome/link";
import {createTRPCProxyClient} from "@trpc/client";
import {transformer} from "@repo/facts-db";

export const createRuntimeClient = () => {
  const port = chrome.runtime.connect();
  return createTRPCProxyClient<typeof backgroundRouter>({
    transformer,
    links: [chromeLink({port})],
  });
};

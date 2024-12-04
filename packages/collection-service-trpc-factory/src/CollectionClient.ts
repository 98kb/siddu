import {CollectionRouter} from "./CollectionRouter";
import {createTRPCProxyClient} from "@trpc/client";

export type CollectionClient = ReturnType<
  typeof createTRPCProxyClient<CollectionRouter>
>;

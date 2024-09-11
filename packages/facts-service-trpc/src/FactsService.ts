import {AppRouter} from "./AppRouter";
import {createTRPCProxyClient} from "@trpc/client";

export type FactsService = ReturnType<typeof createTRPCProxyClient<AppRouter>>;

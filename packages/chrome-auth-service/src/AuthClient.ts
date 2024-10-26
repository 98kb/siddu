import {ChromeAuthRouter} from "./ChromeAuthRouter";
import {createTRPCProxyClient} from "@trpc/client";

export type AuthClient = ReturnType<
  typeof createTRPCProxyClient<ChromeAuthRouter>
>;

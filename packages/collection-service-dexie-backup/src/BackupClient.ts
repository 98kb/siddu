import {BackupRouter} from "./BackupRouter";
import {createTRPCProxyClient} from "@trpc/client";

export type BackupClient = ReturnType<
  typeof createTRPCProxyClient<BackupRouter>
>;

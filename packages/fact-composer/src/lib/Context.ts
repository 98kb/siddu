import type {DbClient} from "@repo/facts-db";

export type Context = {
  db: DbClient;
};

import {DbClient, DexieAdapter} from "@repo/facts-db";
import {factsDb} from "./factsDb";

export const db = new DbClient(table => new DexieAdapter(table, factsDb));

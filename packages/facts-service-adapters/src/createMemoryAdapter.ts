import {AdapterFactory} from "@repo/facts-service";
import {MemoryAdapter} from "./MemoryAdapter";

export const createMemoryAdapter: AdapterFactory = table =>
  new MemoryAdapter(table);

import {AdapterFactory} from "./AdapterFactory";
import {MemoryAdapter} from "./MemoryAdapter";

export const createMemoryAdapter: AdapterFactory = table =>
  new MemoryAdapter(table);

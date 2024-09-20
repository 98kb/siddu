import {AdapterFactory} from "./AdapterFactory";
import {MemoryAdapter} from "./MemoryAdapter";

export const createMemoryAdapter: AdapterFactory = options =>
  new MemoryAdapter(options);

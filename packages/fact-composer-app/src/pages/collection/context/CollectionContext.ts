import {CollectionClient} from "@repo/collection-service-trpc-factory";
import {createContext} from "react";

export const CollectionContext = createContext<CollectionClient | undefined>(
  undefined,
);

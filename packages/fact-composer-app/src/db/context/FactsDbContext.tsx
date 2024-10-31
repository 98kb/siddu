import {DbClient} from "@repo/facts-db";
import {createContext} from "react";

export const FactsDbContext = createContext<DbClient | undefined>(undefined);

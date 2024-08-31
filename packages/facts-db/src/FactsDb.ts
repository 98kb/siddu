import {FactsDbSchema} from "./FactsDbSchema";
import Dexie from "dexie";

export type FactsDB = Dexie & FactsDbSchema;

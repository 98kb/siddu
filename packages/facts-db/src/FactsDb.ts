import {Tables} from "./schema/Tables";
import Dexie from "dexie";

export type FactsDB = Dexie & Tables;

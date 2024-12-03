import {Tables} from "./Tables";
import Dexie from "dexie";

export type CollectionDB = Dexie & Tables;

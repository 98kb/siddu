import {CollectionSchema} from "../schemas/CollectionSchema";
import {model} from "mongoose";
import {zodSchema} from "@zodyac/zod-mongoose";

export const Collection = model("Collection", zodSchema(CollectionSchema));

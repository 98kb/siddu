import {CollectionSchema} from "../schemas/CollectionSchema";
import {z} from "zod";

export const ListCollectionsOutputDto = z.array(CollectionSchema);
export type ListCollectionsOutput = z.infer<typeof ListCollectionsOutputDto>;

import {FactSchema} from "./FactSchema";
import {z} from "zod";

export type Fact = z.infer<typeof FactSchema>;

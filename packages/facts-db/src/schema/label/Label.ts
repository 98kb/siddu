import {LabelSchema} from "./LabelSchema";
import {z} from "zod";

export type Label = z.infer<typeof LabelSchema>;

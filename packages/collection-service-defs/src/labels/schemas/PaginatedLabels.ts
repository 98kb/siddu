import {LabelSchema} from "./LabelSchema";
import {toPaginatedListSchema} from "../../common/schema/PaginatedListSchema";

export const PaginatedLabels = toPaginatedListSchema(LabelSchema);

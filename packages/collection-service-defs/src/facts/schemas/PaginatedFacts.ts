import {FactSchema} from "./FactSchema";
import {toPaginatedListSchema} from "../../common/schema/PaginatedListSchema";

export const PaginatedFacts = toPaginatedListSchema(FactSchema);

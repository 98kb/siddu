import {IQuery} from "../../common/types/IQuery";

export interface IFactsQuery extends IQuery {
  query?: string;
  isDeleted?: boolean;
  labelIds?: string[];
}

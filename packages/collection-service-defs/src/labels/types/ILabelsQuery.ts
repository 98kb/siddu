import {IQuery} from "../../common/types/IQuery";
export interface ILabelsQuery extends IQuery {
  query?: string;
  isDeleted?: boolean;
}

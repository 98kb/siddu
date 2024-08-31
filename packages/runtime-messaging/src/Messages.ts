import {Fact} from "@repo/facts-db";

export type Messages = {
  addOne: {
    payload: Omit<Fact, "id">;
    result: void;
  };
  getOne: {
    payload: {id: string};
    result: Fact | undefined;
  };
  getAll: {
    payload: never;
    result: Fact[];
  };
  updateOne: {
    payload: {id: string; note: Partial<Fact>};
    result: void;
  };
  deleteOne: {
    payload: {id: string};
    result: void;
  };
  filter: {
    payload: (fact: Fact) => boolean;
    result: Fact[];
  };
};

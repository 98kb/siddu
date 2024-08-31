import {Reader} from "fp-ts/lib/Reader";
import type {Fact} from "@repo/facts-db";

// TODO: Use higher-kinded types when TypeScript supports them
// Ugly and verbose, but it works
export type Requests = {
  addOne: {
    payload: Omit<Fact, "id">;
    result: void;
  };
  getOne: {
    payload: {id: string};
    result: Fact | undefined;
  };
  getAll: {
    payload: any;
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
    payload: {predicate: Reader<Fact, boolean>};
    result: Fact[];
  };
};

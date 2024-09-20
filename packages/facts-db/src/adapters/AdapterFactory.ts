import {AdapterOption} from "./AdapterOption";
import {IAdapter} from "./IAdapter";
import {Tables} from "../schema/Tables";

export type AdapterFactory = <T extends keyof Tables>(
  options: AdapterOption<T>,
) => IAdapter<T>;

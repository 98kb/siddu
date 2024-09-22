import {contextKey} from "./contextKey";
import {getContext} from "svelte";
import type {Context} from "./Context";

export const injectDbClient = () => {
  return getContext<Context>(contextKey).db;
};

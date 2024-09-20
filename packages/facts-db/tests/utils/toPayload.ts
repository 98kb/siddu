import {IAdapter} from "../../src/adapters/IAdapter";
import {Tables} from "../../src/schema/Tables";

const random = () => Math.random().toString(36).slice(2);
export const createPayloads = () => ({
  facts: {content: random()},
  collections: {name: random()},
});

export const toPayload = <T extends keyof Tables>(adapter: IAdapter<T>) => {
  const payloads = createPayloads();
  return payloads[adapter.options.entity];
};

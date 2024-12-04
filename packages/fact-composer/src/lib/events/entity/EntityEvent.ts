import {EntityEventType} from "./EntityEventType";

export type EntityEvent<T> = {
  type: EntityEventType;
  payload: T;
};

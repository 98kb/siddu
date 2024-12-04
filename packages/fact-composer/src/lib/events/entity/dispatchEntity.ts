import {dispatch as d} from "use-bus";
import {EntityEventType} from "./EntityEventType";

export const dispatchEntity = <T>(type: EntityEventType, payload: T) =>
  d({type, payload});

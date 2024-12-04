import useBus from "use-bus";
import {EntityEventType} from "./EntityEventType";
import {EntityEvent} from "./EntityEvent";
import {Reader} from "fp-ts/lib/Reader";

export function useEntityBus<T>(
  type: EntityEventType,
  cb: Reader<EntityEvent<T>, void>,
) {
  useBus(
    event => event.type === type,
    event => cb(event as EntityEvent<T>),
    [cb],
  );
}

import {MessagePayload} from "./MessagePayload";

// TODO: add a new package for fact-composer messaging

export class Message<T extends keyof MessagePayload> {
  constructor(
    readonly type: T,
    readonly payload: MessagePayload[T],
  ) {}
}

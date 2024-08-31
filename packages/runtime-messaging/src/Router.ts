import {Message} from "./Message";
import type {Reader} from "fp-ts/lib/Reader";

export type Router = (
  message: Message,
  sendResponse: Reader<unknown, void>,
) => void;

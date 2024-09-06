import {Message} from "./Message";
import {TableObjects} from "@repo/facts-db";
import type {Reader} from "fp-ts/lib/Reader";

export type Router<T extends keyof TableObjects> = (
  message: Message<T>,
  sendResponse: Reader<unknown, void>,
) => void;

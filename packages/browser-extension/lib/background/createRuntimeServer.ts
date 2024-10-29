import {backgroundRouter} from "./backgroundRouter";
import {createChromeHandler} from "trpc-chrome/adapter";

export function createRuntimeServer() {
  return createChromeHandler({
    createContext: () => ({}),
    router: backgroundRouter,
    onError: console.error,
  });
}

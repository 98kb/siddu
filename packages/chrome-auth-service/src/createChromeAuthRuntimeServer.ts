import {createAppRouter} from "./createAppRouter";
import {createChromeHandler} from "trpc-chrome/adapter";
import {ChromeAuth} from "./services/ChromeAuth";

export const createChromeAuthRuntimeServer = () =>
  createChromeHandler({
    router: createAppRouter(new ChromeAuth()),
    onError: console.error,
  });

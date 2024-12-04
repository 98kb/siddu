import {Composer} from "./pages/app/Composer";
import {ComponentProps} from "react";

declare module "@repo/fact-composer-app" {
  export const createApp: (
    container: HTMLElement,
    props: ComponentProps<typeof Composer>,
  ) => void;
}

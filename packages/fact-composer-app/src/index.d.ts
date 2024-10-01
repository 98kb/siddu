import {Composer} from "./composer/Composer.tsx";
import {ComponentProps} from "react";

declare module "@repo/fact-composer-app" {
  export const createApp: (
    container: HTMLElement,
    props: ComponentProps<typeof Composer>,
  ) => void;
}

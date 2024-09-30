declare module "@repo/fact-composer-app" {
  import {ComponentProps} from "react";
  import {ComposerModal} from "./composer/ComposerModal.tsx";

  export const createApp: (
    container: HTMLElement,
    props: ComponentProps<typeof ComposerModal>,
  ) => void;
}

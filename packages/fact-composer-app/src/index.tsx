import {ComponentProps, StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {ComposerModal} from "./composer/ComposerModal.tsx";

export const createApp = (
  container: HTMLElement,
  props: ComponentProps<typeof ComposerModal>,
) =>
  createRoot(container).render(
    <StrictMode>
      <ComposerModal {...props} />
    </StrictMode>,
  );

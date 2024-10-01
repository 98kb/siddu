import {ComponentProps, StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {Composer} from "./composer/Composer.tsx";

export const createApp = (
  container: HTMLElement,
  props: ComponentProps<typeof Composer>,
) =>
  createRoot(container).render(
    <StrictMode>
      <Composer {...props} />
    </StrictMode>,
  );

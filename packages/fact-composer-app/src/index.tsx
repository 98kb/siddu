import "normalize.css";
import {ComponentProps, StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {Composer} from "./pages/app/Composer";

export const createApp = (
  container: HTMLElement,
  props: ComponentProps<typeof Composer>,
) =>
  createRoot(container).render(
    <StrictMode>
      <Composer {...props} />
    </StrictMode>,
  );

import {Tooltip as TooltipPrimitive} from "bits-ui";

const Root = TooltipPrimitive.Root;
const Trigger = TooltipPrimitive.Trigger;

export {
  Root,
  Trigger,

  //
  Root as Tooltip,
  Trigger as TooltipTrigger,
};

export {
  default as Content,
  default as TooltipContent,
} from "./tooltip-content.svelte";

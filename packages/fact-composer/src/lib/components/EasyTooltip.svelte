<script lang="ts">
  import type {ComponentProps} from "svelte";
  import {Tooltip, TooltipTrigger} from "./ui/tooltip";
  import TooltipContent from "./ui/tooltip/tooltip-content.svelte";

  export let tooltip: string;
  export let side: ComponentProps<TooltipContent>["side"] = "bottom";
  export let openDelay: number = 500;
  export let sideOffset: number = 0;
</script>

<Tooltip {openDelay}>
  <TooltipTrigger>
    <slot />
  </TooltipTrigger>
  <TooltipContent {side} {sideOffset}>
    <span class="capitalize text-xs">{tooltip}</span>
  </TooltipContent>
</Tooltip>

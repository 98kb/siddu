<script lang="ts">
  import type {ComponentProps} from "svelte";
  import {Tooltip, TooltipTrigger} from "./ui/tooltip";
  import TooltipContent from "./ui/tooltip/tooltip-content.svelte";

  export let tooltip: string;
  export let side: ComponentProps<TooltipContent>["side"] = "bottom";
</script>

<Tooltip openDelay={500}>
  <TooltipTrigger>
    <slot />
  </TooltipTrigger>
  <TooltipContent {side} sideOffset={0}>
    <span class="capitalize text-xs">{tooltip}</span>
  </TooltipContent>
</Tooltip>

<script lang="ts">
  import EasyTooltip from "$lib/components/EasyTooltip.svelte";
  import {Button} from "$lib/components/ui/button";
  import {cn} from "$lib/utils";
  import type {ComponentProps} from "svelte";

  type $$Props = ComponentProps<Button> &
    Pick<ComponentProps<EasyTooltip>, "tooltip">;

  export let tooltip: string;
  let openDelay = 250;
  let className: $$Props["class"] = undefined;
</script>

<EasyTooltip {tooltip} {openDelay}>
  <Button
    size="icon"
    variant="ghost"
    class={cn("rounded-full", className)}
    {...$$restProps}
    on:click
  >
    <slot />
  </Button>
</EasyTooltip>

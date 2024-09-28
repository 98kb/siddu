<script lang="ts">
  import EasyTooltip from "$lib/components/EasyTooltip.svelte";
  import {Button} from "$lib/components/ui/button";

  export let name: string;
  export let isActive: boolean;
  let openDelay: number = 100;
  let sideOffset: number = 20;
</script>

<EasyTooltip side="left" tooltip={name} {openDelay} {sideOffset}>
  <Button size="icon" on:click variant={isActive ? "default" : "ghost"}>
    <slot />
  </Button>
</EasyTooltip>

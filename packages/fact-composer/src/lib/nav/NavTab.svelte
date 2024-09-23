<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import {activeRoute, setActiveRoute, type Routes} from "$lib/router/router";

  export let name: Routes;
</script>

<Button
  size="icon"
  variant={$activeRoute === name ? "default" : "ghost"}
  on:click={() => setActiveRoute(name)}
>
  <Tooltip openDelay={100}>
    <TooltipTrigger>
      <slot />
    </TooltipTrigger>
    <TooltipContent side="left" sideOffset={20}>
      <span class="capitalize">
        {name}
      </span>
    </TooltipContent>
  </Tooltip>
</Button>

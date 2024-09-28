<script lang="ts">
  import type {SwitchRoutes} from "./SwitchRoutes";

  export let routes: SwitchRoutes;
  export let activeRoute: string;
</script>

{#if activeRoute in routes}
  <svelte:component this={routes[activeRoute]} on:submit />
{:else}
  <div class="flex w-full h-full justify-center items-center">
    <p class="text-2xl">404 Not Found</p>
  </div>
{/if}

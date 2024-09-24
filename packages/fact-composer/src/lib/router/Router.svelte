<script lang="ts">
  import {activeRoute} from "./router"
</script>

{#if $activeRoute === "composition"}
  <div class="page">
    <slot name="composition" />
  </div>
{:else if $activeRoute === "labels"}
  <div class="page">
    <slot name="labels" />
  </div>
{:else if $activeRoute === "collection"}
  <div class="page">
    <slot name="collection" />
  </div>
{:else}
  <div class="flex w-full h-full justify-center items-center">
    <p class="text-2xl">404 Not Found</p>
  </div>
{/if}

<style>
  .page {
    width: 100%;
    height: 100%;
    display: flex;
  }
</style>

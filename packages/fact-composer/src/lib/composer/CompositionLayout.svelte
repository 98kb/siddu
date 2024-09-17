<script lang="ts">
  import {cn} from "$lib/utils";
</script>

<div class="flex flex-col h-full">
  <slot name="search"></slot>
  <div class="flex h-full gap-4">
    <div class="w-full h-full bg-gray-50">
      <slot name="sidebar"></slot>
    </div>
    <div
      class={cn(
        "flex flex-col",
        "w-full h-full",
      )}
    >
      <slot></slot>
    </div>
  </div>
</div>

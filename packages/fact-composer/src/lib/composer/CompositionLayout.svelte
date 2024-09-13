<script lang="ts">
  import {cn} from "$lib/utils";
</script>

<div class="flex flex-col min-h-[500px] max-h-[600px] w-[66vw] min-w-[66vw] border rounded-lg">
  <slot name="search"></slot>
  <div class="flex gap-4">
    <div class="w-full h-full bg-gray-50">
      <slot name="sidebar"></slot>
    </div>
    <div
      class={cn(
        "flex flex-col",
        "w-full min-h-[500px] h-full max-w-[33vw] min-w-[33vw]",
      )}
    >
      <slot></slot>
    </div>
  </div>
</div>

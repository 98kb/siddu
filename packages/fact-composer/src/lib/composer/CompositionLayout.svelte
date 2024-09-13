<script lang="ts">
  import {cn} from "$lib/utils";
</script>

<div class="flex flex-col w-full min-h-[500px] max-h-[800px] max-w-[66vw] min-w-[66vw] border">
  <slot name="search"></slot>
  <div class="flex gap-4">
    <slot name="sidebar"></slot>
    <div
      class={cn(
        "flex flex-col",
        "w-full min-h-[500px] max-w-[33vw] min-w-[33vw]",
        "focus-within:border"
      )}
    >
      <slot></slot>
    </div>
  </div>
</div>

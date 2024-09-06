<script lang="ts">
  import { cn } from "$lib/utils";
</script>

<div class="flex gap-4 w-full min-h-[300px] max-h-[300px] max-w-[66vw] min-w-[66vw]">
  <div class="max-w-[28vw] min-w-[28vw]">
    <slot name="sidebar"></slot>
  </div>
  <div
    class={cn(
      "w-full min-h-[300px] max-h-[300px] max-w-[33vw] min-w-[33vw]",
      "focus-within:border"
    )}
  >
    <slot></slot>
  </div>
</div>

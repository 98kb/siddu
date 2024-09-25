<script lang="ts">
  import {cn} from "$lib/utils";

  export let isSelected: boolean;
  export let onClick: () => void;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<span
  class={cn(
    "inline-flex gap-5 p-2 pl-4 items-center",
    "cursor-pointer rounded-r-full text-sm",
    "hover:bg-gray-100",
    isSelected && "bg-gray-100",
  )}
  on:click={onClick}
>
  <slot />
</span>

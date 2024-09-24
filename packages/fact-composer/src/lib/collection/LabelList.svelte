<script lang="ts">
  import {labels} from "$lib/labels/store/labels";
  import {cn} from "$lib/utils";
  import LabelIcon from "./LabelIcon.svelte";

  let selected: number = 0;
</script>

<div class="flex flex-col">
  {#each $labels as label (label.id)}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <span
      class={cn([
        "inline-flex gap-5 p-2 px-4 items-center",
        "cursor-pointer rounded-r-full text-sm",
        {
          "hover:bg-gray-100": selected !== label.id,
          "bg-gray-100": selected === label.id,
        },
      ])}
      class:bg-primary={selected === label.id}
      on:click={() => (selected = label.id)}
      tabindex="0"
      role="button"
    >
      <LabelIcon />
      {label.name}
    </span>
  {/each}
</div>

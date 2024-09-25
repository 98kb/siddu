<script lang="ts">
  import AsidePill from "./AsidePill.svelte";
  import LabelIcon from "./LabelIcon.svelte";
  import type {Label} from "@repo/facts-db";
  import {BookOpenTextIcon} from "lucide-svelte";

  export let labels: Label[];
  let selected: number = 0;
</script>

<AsidePill isSelected={selected === 0} onClick={() => (selected = 0)}>
  <BookOpenTextIcon />
  Facts
</AsidePill>
{#each labels as label (label.id)}
  <AsidePill
    isSelected={selected === label.id}
    onClick={() => (selected = label.id)}
  >
    <LabelIcon />
    {label.name}
  </AsidePill>
{/each}

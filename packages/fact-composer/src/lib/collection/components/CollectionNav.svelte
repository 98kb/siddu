<script lang="ts">
  import CollectionNavItem from "./CollectionNavItem.svelte";
  import LabelIcon from "./LabelIcon.svelte";
  import type {Label} from "@repo/facts-db";
  import {ArchiveIcon, BookOpenTextIcon} from "lucide-svelte";

  export let labels: Label[];
  let selected: number = 0;
</script>

<CollectionNavItem isSelected={selected === -1} onClick={() => (selected = -1)}>
  <BookOpenTextIcon />
  Facts
</CollectionNavItem>
<CollectionNavItem isSelected={selected === 0} onClick={() => (selected = 0)}>
  <ArchiveIcon />
  Archive
</CollectionNavItem>
{#each labels as label (label.id)}
  <CollectionNavItem
    isSelected={selected === label.id}
    onClick={() => (selected = label.id)}
  >
    <LabelIcon />
    {label.name}
  </CollectionNavItem>
{/each}

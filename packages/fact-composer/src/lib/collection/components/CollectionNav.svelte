<script lang="ts">
  import {factsFilter} from "../store/factsFilter";
  import CollectionNavItem from "./CollectionNavItem.svelte";
  import LabelIcon from "./LabelIcon.svelte";
  import type {Label} from "@repo/facts-db";
  import {ArchiveIcon, BookOpenTextIcon} from "lucide-svelte";

  export let labels: Label[];
  let selected: number = 0;
  const clearFilters = () => {
    selected = -1;
    factsFilter.set({labels: []});
  };

  const selectLabel = (label: Label) => () => {
    selected = label.id;
    factsFilter.set({labels: [label]});
  };
</script>

<CollectionNavItem isSelected={selected === -1} onClick={clearFilters}>
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
    onClick={selectLabel(label)}
  >
    <LabelIcon />
    {label.name}
  </CollectionNavItem>
{/each}

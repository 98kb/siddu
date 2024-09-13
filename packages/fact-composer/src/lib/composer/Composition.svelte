<script lang="ts">
  import CompositionLayout from "./CompositionLayout.svelte";
  import {query} from "./store/query";
  import FactList from "./FactList.svelte";
  import { CommandInput } from "$lib/components/ui/command";
</script>

<CompositionLayout>
  <slot />

  <svelte:fragment slot="search">
    <CommandInput
      autofocus
      placeholder="Type to search..."
      bind:value={$query}
    />
  </svelte:fragment>

  <svelte:fragment slot="sidebar">
    <FactList />
  </svelte:fragment>
</CompositionLayout>

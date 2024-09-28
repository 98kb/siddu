<script lang="ts">
  import {facts} from "$lib/store/facts";
  import Masonry from "svelte-bricks";
  import FactCard from "./components/FactCard.svelte";
  import CollectionNav from "./components/CollectionNav.svelte";
  import AddFact from "./components/AddFact.svelte";
  import {onMount} from "svelte";
  import {liveStore} from "$lib/db/liveStore";
  import {injectDbClient} from "$lib/injectDbClient";
  import {labels} from "$lib/labels/store/labels";
  import {Button} from "$lib/components/ui/button";
  import {PlusIcon} from "lucide-svelte";
  import type {Fact, InsertFact} from "@repo/facts-db";
  import deepClone from "lodash.clonedeep";
  import isEqual from "lodash.isequal";
  import { filteredFacts } from "./store/filteredFacts";

  const db = injectDbClient();
  onMount(liveStore(db.facts, facts));
  onMount(liveStore(db.labels, labels));

  let selectedFact: Fact | InsertFact | undefined;
</script>

<div class="flex w-full">
  <aside class="flex flex-col min-w-[15vw] pr-10 py-5">
    <CollectionNav labels={$labels} />
  </aside>
  <div
    class="flex flex-col w-full h-full py-5 px-4 overflow-y-scroll max-h-[550px] pb-14"
  >
    <div class="flex w-full">
      <Button
        variant="ghost"
        size="sm"
        on:click={() => (selectedFact = {content: "", labels: []})}
      >
        <PlusIcon size="15" /> Add Fact
      </Button>
    </div>
    <Masonry
      class="w-full py-4"
      style="justify-content:start;"
      items={$filteredFacts}
      minColWidth={200}
      maxColWidth={200}
      gap={15}
      let:item={fact}
    >
      <FactCard
        {fact}
        isSelected={isEqual(fact, selectedFact)}
        on:click={() => (selectedFact = deepClone(fact))}
      />
    </Masonry>
  </div>
  <AddFact bind:fact={selectedFact} />
</div>

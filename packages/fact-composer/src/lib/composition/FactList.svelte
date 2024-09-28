<script lang="ts">
  import {append} from "./store/composition";
  import {facts} from "../store/facts";
  import FactListItem from "./FactListItem.svelte";
  import {getContext, onMount} from "svelte";
  import type {Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {liveStore} from "$lib/db/liveStore";
  import {query} from "./store/query";
  import SearchInput from "$lib/components/SearchInput.svelte";
  import type {Label} from "@repo/facts-db";
  import {pipe} from "fp-ts/lib/function";
  import {filterFactsByLabels} from "$lib/collection/filterFactsByLabels";

  const {db} = getContext<Context>(contextKey);
  let filterLabels: Label[] = [];
  onMount(liveStore(db.facts, facts));

  $: filteredFacts = pipe(
    $facts.filter(fact =>
      fact.content.toLowerCase().includes($query.toLowerCase()),
    ),
    facts => filterFactsByLabels(facts, filterLabels),
  );
</script>

<SearchInput bind:value={$query} bind:filterLabels />
<div class="flex flex-col gap-2 px-3 max-h-[485px] pb-10 overflow-y-scroll">
  {#each filteredFacts as fact (fact.id)}
    <FactListItem {fact} on:click={() => append(fact.content)} />
  {/each}
</div>

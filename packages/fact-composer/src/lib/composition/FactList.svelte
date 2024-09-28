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

  const {db} = getContext<Context>(contextKey);
  onMount(liveStore(db.facts, facts));

  $: filteredFacts = $facts.filter(fact =>
    fact.content.toLowerCase().includes($query.toLowerCase()),
  );
</script>

<SearchInput bind:value={$query} />
<div class="flex flex-col">
  {#each filteredFacts as fact (fact.id)}
    <FactListItem {fact} on:click={() => append(fact.content)} />
  {/each}
</div>

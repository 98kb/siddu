<script lang="ts">
  import type {FactsService} from "@repo/facts-service";
  import AddFact from "$lib/AddFact.svelte";
  import FactsGrid from "$lib/FactsGrid.svelte";
  import {onMount} from "svelte";
  import {syncFacts} from "$lib/stores/syncFacts"
  import "./app.css";

  export let db: FactsService;
  onMount(syncFacts(db));
</script>

<main class="flex w-full h-full">
  <aside class="min-w-[15vw]">
    <nav></nav>
  </aside>
  <div class="flex flex-col items-center w-full h-full p-10 gap-20">
    <AddFact {db} />
    <FactsGrid {db} />
  </div>
</main>

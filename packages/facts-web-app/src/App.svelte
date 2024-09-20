<script lang="ts">
  import AddFact from "$lib/AddFact.svelte";
  import FactsGrid from "$lib/FactsGrid.svelte";
  import {onMount} from "svelte";
  import {syncFacts} from "$lib/stores/syncFacts"
  import "./app.css";
  import type {DbClient} from "@repo/facts-db";

  export let db: DbClient;
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

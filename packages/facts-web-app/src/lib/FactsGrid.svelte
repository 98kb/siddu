<script lang="ts">
  import type {DbClient} from '@repo/facts-db';
  import Fact from './Fact.svelte';
  import {facts} from "./stores/facts"

  export let db: DbClient;
</script>

<div class="columns-2 lg:columns-5 w-4/5">
  {#each $facts as fact (fact.id)}
    <Fact>
      {fact.content}
      <div slot="footer">
        <button on:click={() => db.facts.delete(fact.id)}>[x]</button>
      </div>
    </Fact>
  {/each}
</div>

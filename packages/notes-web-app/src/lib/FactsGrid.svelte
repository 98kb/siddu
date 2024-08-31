<script lang="ts">
  import { type FactsDb } from '@repo/facts-db';
  import NotesGridItem from './NotesGridItem.svelte';

  export let db: FactsDb;
  const facts = db.toObservable(() => db.objects.getAll());
  const deleteOne = (id: string) => db.objects.deleteOne(id);
</script>

<div class="columns-2 lg:columns-5 w-4/5">
  {#if $facts}
    {#each $facts as fact (fact.id)}
      <NotesGridItem>
        {fact.content}
        <div slot="footer">
          <button on:click={() => deleteOne(fact.id)}>[x]</button>
        </div>
      </NotesGridItem>
    {/each}
  {/if}
</div>

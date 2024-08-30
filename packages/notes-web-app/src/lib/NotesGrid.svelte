<script lang="ts">
  import { liveQuery, type DAO, type Note } from '@repo/notes-db';
  import NotesGridItem from './NotesGridItem.svelte';

  export let notes: DAO<Note>;
  const notes$ = liveQuery(() => notes.getAll());
</script>

<div class="columns-2 lg:columns-5 w-4/5">
  {#if $notes$}
    {#each $notes$ as note (note.id)}
      <NotesGridItem>
        {note.content}
        <div slot="footer">
          <button on:click={() => notes.softDelete(note.id)}>[x]</button>
        </div>
      </NotesGridItem>
    {/each}
  {/if}
</div>

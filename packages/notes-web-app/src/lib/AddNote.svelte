<script lang="ts">
  import { db } from '@repo/notes-db';
  let input: HTMLInputElement;

  async function addNote() {
    await db.notes.add({content: input.value});
    input.value = "";
  }
</script>


<form on:submit|preventDefault={addNote}>
  <input
  bind:this={input}
  class="focus-within:outline-none"
  placeholder="Start typing..."
  />
</form>

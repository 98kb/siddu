<script lang="ts">
  import { db } from '@repo/notes-db';
  import Input from './components/ui/input/input.svelte';
  let value: string;

  async function addNote() {
    await db.notes.add({content: value});
    value = "";
  }
</script>


<form on:submit|preventDefault={addNote}>
  <Input
    autofocus
    class="focus-within:outline-none min-w-[40vw] w-[1000px] p-5 rounded-lg text-lg border-gray-500 shadow"
    placeholder="Add a block..."
    bind:value
  />
</form>

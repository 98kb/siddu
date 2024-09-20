<script lang="ts">
  import Input from './components/ui/input/input.svelte';
  import type {DbClient} from '@repo/facts-db';

  export let db: DbClient;

  let value: string;

  async function addFact() {
    await db.facts.add({content: value});
    value = "";
  }
</script>


<form on:submit|preventDefault={addFact}>
  <Input
    autofocus
    class="focus-within:outline-none min-w-[40vw] w-[1000px] p-5 rounded-lg text-lg border-gray-500 shadow"
    placeholder="Add a block..."
    bind:value
  />
</form>

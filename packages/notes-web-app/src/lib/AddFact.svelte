<script lang="ts">
  import { type FactsDb } from '@repo/facts-db';
  import Input from './components/ui/input/input.svelte';

  export let db: FactsDb;

  let value: string;

  async function addFact() {
    await db.objects.addOne({content: value});
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

<script lang="ts">
  import {type FactsService} from '@repo/facts-service';
  import Input from './components/ui/input/input.svelte';

  export let db: FactsService;

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

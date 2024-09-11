<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { createEventDispatcher, getContext } from "svelte";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";

  const dispatch = createEventDispatcher<{added: void}>();
  const {db} = getContext<Context>(contextKey);
  export let query = "";
</script>

{#if query.length > 0}
  <Button
    variant="ghost"
    class="w-full m-0 justify-start"
    on:click={async () => {
      if (query.length > 0) {
        await db.facts.add({content: query});
        dispatch("added");
      }
    }}
  >Add "{query}"</Button>
{:else}
  Type to add a new fact
{/if}

<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import {getContext} from "svelte";
  import {type Context} from "$lib/Context";
  import {contextKey} from "$lib/contextKey";
  import {query} from "./store/query";
  import {append} from "./store/composition";

  const {db} = getContext<Context>(contextKey);
</script>

{#if $query.length > 0}
  <Button
    variant="ghost"
    class="w-full m-0 justify-start"
    on:click={async () => {
        await db.facts.add({content: $query});
        append($query);
        $query = "";
      }
    }
  >Add "{$query}"</Button>
{:else}
  Type to add a new fact
{/if}

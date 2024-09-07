<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import { createEventDispatcher, getContext } from "svelte";
  import { Context } from "./Context";
  import type { ORM } from "@repo/facts-db";

  const dispatch = createEventDispatcher<{added: void}>();
  const facts = getContext<ORM<"facts">>(Context.FactsORM);
  export let query = "";
</script>

<Button
  variant="ghost"
  class="w-full m-0 justify-start"
  on:click={async () => {
    if (query.length > 0) {
      await facts.objects.addOne({content: query});
      dispatch("added");
    }
  }}
>Add "{query}"</Button>

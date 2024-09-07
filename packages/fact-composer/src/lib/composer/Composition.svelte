<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {ORM, Fact} from "@repo/facts-db";
  import Button from "$ui/button/button.svelte";
  import { concat } from "$lib/concat";
  import CompositionLayout from "./CompositionLayout.svelte";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher<{
    change: string;
  }>();

  export let placeholder = "";
  export let facts: ORM<"facts">;
  export let value: string;

  const facts$ = facts.toObservable(() => facts.objects.getAll());

  let query = "";
  let composition = "";

  $: {
    composition = value;
  }


  const append = (str: string) => {
    composition = concat("\n")(composition, str);
  };

  const addToComposition = (fact: Fact) => {
    append(fact.content);
    query = "";
  };

  const addFact = async () => {
    if (query) {
      await facts.objects.addOne({content: query});
      append(query);
      query = "";
    }
  };

  const copyValue = () => navigator.clipboard.writeText(composition);
  const emitValue = () => dispatch("change", composition);
</script>

<CompositionLayout>
  <svelte:fragment slot="sidebar">
    <Command.Input
      placeholder="Type to search..."
      autofocus
      bind:value={query}
    />
    <Command.List>
      <Command.Empty class="p-0">
          <Button
            variant="ghost"
            class="w-full m-0 justify-start"
            on:click={addFact}
          >Add "{query}"</Button>
      </Command.Empty>
      {#if $facts$}
      {#each $facts$ as fact (fact.id)}
      <Command.Item onSelect={() => addToComposition(fact)}>
        {fact.content}
      </Command.Item>
      {/each}
      {/if}
    </Command.List>
  </svelte:fragment>

  <UnstyledTextarea
    class="w-full"
    {placeholder}
    bind:value={composition}
  />

  <div class="flex justify-end">
    <Button on:click={copyValue}>Copy</Button>
    <Button on:click={emitValue}>OK</Button>
  </div>
</CompositionLayout>

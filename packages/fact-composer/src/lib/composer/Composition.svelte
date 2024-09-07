<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {ORM, Fact} from "@repo/facts-db";
  import Button from "$ui/button/button.svelte";
  import { concat } from "$lib/concat";
  import CompositionLayout from "./CompositionLayout.svelte";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
  import { createEventDispatcher } from "svelte";
  import type { Reader } from "fp-ts/lib/Reader";

  const dispatch = createEventDispatcher<{
    change: string;
  }>();

  export let facts: ORM<"facts">;
  export let placeholder = "";
  export let value: string = "";

  const facts$ = facts.toObservable(() => facts.objects.getAll());
  let query = "";
  let composition = "";

  $: {
    composition = value;
  }

  const append = (str: string) => {
    composition = concat("\n")(composition, str);
    query = "";
  };
  const addToComposition: Reader<Fact, void> = fact => append(fact.content);
  const copyValue = () => navigator.clipboard.writeText(composition);
  const emitValue = () => dispatch("change", composition);
  const addFact = async () => {
    if (query) {
      await facts.objects.addOne({content: query});
      append(query);
    }
  };
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

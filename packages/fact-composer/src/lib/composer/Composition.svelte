<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {ORM, Fact} from "@repo/facts-db";
  import Button from "$ui/button/button.svelte";
  import { concat } from "$lib/concat";
  import CompositionLayout from "./CompositionLayout.svelte";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";

  export let placeholder = "";
  export let facts: ORM<"facts">;
  let query = "";
  let value = "";

  const facts$ = facts.toObservable(() => facts.objects.getAll());

  const appendValue = (str: string) => {
    value = concat("\n")(value, str);
  };

  const handleSelect = (fact: Fact) => {
    appendValue(fact.content);
    query = "";
  };

  const addFact = async () => {
    if (query) {
      await facts.objects.addOne({content: query});
      appendValue(query);
      query = "";
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
      <Command.Item onSelect={() => handleSelect(fact)}>
        {fact.content}
      </Command.Item>
      {/each}
      {/if}
    </Command.List>
  </svelte:fragment>

  <UnstyledTextarea
    class="w-full"
    {placeholder}
    bind:value
  />

  <div class="flex justify-end">
    <Button on:click={() => navigator.clipboard.writeText(value)}>Copy</Button>
  </div>
</CompositionLayout>

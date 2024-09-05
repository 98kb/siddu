<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {FactsORM, Fact} from "@repo/facts-db";
  import CompositionEditor from "./CompositionEditor.svelte";
  import Button from "$lib/components/ui/button/button.svelte";

  export let placeholder = "";
  export let db: FactsORM;
  let query = "";
  let value = "";

  const facts = db.toObservable(() => db.objects.getAll());

  const concatValue = (newValue: string) => {
    value = [value, newValue].filter(Boolean).join("\n");
  };

  const handleSelect = (fact: Fact) => {
    concatValue(fact.content);
    query = "";
  };

  const addFact = async () => {
    if (query) {
      await db.objects.addOne({content: query});
      concatValue(query);
      query = "";
    }
  };
</script>

<div class="flex gap-4 w-full min-h-[300px] max-h-[300px] max-w-[66vw] min-w-[66vw]">
  <div class="min-w-[33vw]">
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
      {#if $facts}
      {#each $facts as fact (fact.id)}
      <Command.Item onSelect={() => handleSelect(fact)}>
        {fact.content}
      </Command.Item>
      {/each}
      {/if}
    </Command.List>
  </div>
  <CompositionEditor
    placeholder={placeholder}
    bind:value={value}
  />
</div>

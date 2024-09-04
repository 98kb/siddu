<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {FactsORM, Fact} from "@repo/facts-db";
  import { Textarea } from "$lib/components/ui/textarea";
  import CompositionEditor from "./CompositionEditor.svelte";

  export let placeholder = "";
  export let db: FactsORM;
  let query = "";
  let value = "";

  const facts = db.toObservable(() => db.objects.getAll());

  const handleSelect = (fact: Fact) => {
    value = [value, fact.content].filter(Boolean).join("\n");
    query = "";
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
      <Command.Empty>
        No facts found.
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

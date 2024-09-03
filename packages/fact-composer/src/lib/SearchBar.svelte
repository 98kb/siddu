<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {FactsORM, Fact} from "@repo/facts-db";
  import { Textarea } from "./components/ui/textarea";

  export let db: FactsORM;
  let query = "";
  let placeholder = "";
  let value = "";

  const facts = db.toObservable(() => db.objects.getAll());

  const handleSelect = (fact: Fact) => {
    value = [value, fact.content].filter(Boolean).join("\n");
    query = "";
  };
</script>

<div class="flex gap-2 w-full min-h-[300px] max-w-[66vw] min-w-[66vw]">
  <Command.Dialog
    class="max-h-[400px] w-full"
    bind:value={placeholder}
  >
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
  </Command.Dialog>
  <Textarea
    class="w-full min-h-[200px]"
    bind:placeholder
    bind:value
  />
</div>

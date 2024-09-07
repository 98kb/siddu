<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import type {Fact} from "@repo/facts-db";
  import Button from "$ui/button/button.svelte";
  import {concat} from "$lib/concat";
  import CompositionLayout from "./CompositionLayout.svelte";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
  import {createEventDispatcher} from "svelte";
  import FactPlaceHolder from "./FactPlaceHolder.svelte";

  const dispatch = createEventDispatcher<{
    change: string;
  }>();

  export let facts: Fact[] = [];
  export let placeholder = "";
  export let value: string = "";

  let query = "";
  let composition = "";

  $: {
    composition = value;
  }

  const append = (str: string) => {
    composition = concat("\n")(composition, str);
    query = "";
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
        <FactPlaceHolder {query} on:added={() => append(query)} />
      </Command.Empty>
      {#each facts as fact (fact.id)}
        <Command.Item onSelect={() => append(fact.content)}>
          {fact.content}
        </Command.Item>
      {/each}
    </Command.List>
  </svelte:fragment>

  <div class="flex justify-end">
    <Button on:click={copyValue}>Copy</Button>
    <Button on:click={emitValue}>OK</Button>
  </div>

  <UnstyledTextarea
    class="w-full h-full"
    {placeholder}
    bind:value={composition}
  />
</CompositionLayout>

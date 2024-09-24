<script lang="ts">
  import {Card, CardContent, CardFooter} from "$lib/components/ui/card";
  import type {Fact} from "@repo/facts-db";
  import {selectedFact} from "./store/selectedFact";
  import {openFactEditor} from "./store/openFactEditor";
  import { cn } from "$lib/utils";

  export let fact: Fact;
  $: isSelected = "id" in $selectedFact && $selectedFact.id === fact.id;
  const selectFact = () => {
    $selectedFact = {...fact};
    $openFactEditor = true;
  };
</script>

<Card
  on:click={selectFact}
  class={cn([
    "group",
    "max-w-[200px] max-h-[200px] min-h-[100px]",
    "shadow-none hover:shadow hover:border-gray-300",
    "transition-shadow duration-100 ease-in-out",
    { "border-black hover:border-black": isSelected },
  ])}
>
  <CardContent>
    <p class="break-words cursor-default py-5">
      {fact.content.substring(0, 100)}
      {#if fact.content.length > 100}
        ...
      {/if}
    </p>
  </CardContent>
  {#if fact.labels}
    <CardFooter class="opacity-0 group-hover:opacity-100">
      {#each fact.labels as label (label.id)}
        {label.name.substring(0, 10)}
      {/each}
    </CardFooter>
  {/if}
</Card>

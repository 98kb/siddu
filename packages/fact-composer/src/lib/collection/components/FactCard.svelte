<script lang="ts">
  import {Card, CardContent, CardFooter} from "$lib/components/ui/card";
  import type {Fact} from "@repo/facts-db";
  import {cn} from "$lib/utils";
  import LabelPills from "$lib/labels/LabelPills.svelte";
  import FactCardFooter from "./FactCardFooter.svelte";

  export let fact: Fact;
  export let isSelected: boolean;
  export let onClick: () => void;
</script>

<Card
  class={cn([
    "group",
    "max-w-[200px]",
    "shadow-none hover:shadow hover:border-gray-400",
    "transition-shadow duration-100 ease-in-out",
    {"border-black hover:border-black": isSelected},
  ])}
  on:click={onClick}
>
  <CardContent>
    <div class="w-full">
      <p class="min-h-[100px] line-clamp-5 cursor-default pt-4 mb-2">
        {fact.content}
      </p>
      <div class="flex gap-1 flex-wrap">
        <LabelPills labels={fact.labels} />
      </div>
    </div>
  </CardContent>
  <CardFooter class="opacity-0 group-hover:opacity-100">
    <FactCardFooter {fact} />
  </CardFooter>
</Card>

<script lang="ts">
  import {Badge} from "$lib/components/ui/badge";
  import LabelPills from "$lib/labels/LabelPills.svelte";
  import type {Fact} from "@repo/facts-db";

  export let fact: Fact;

  let labels = ["UX", "Software Engineering"];
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="flex flex-col w-full gap-2 p-4 hover:bg-slate-100" on:click>
  <span class="text-sm">
    {fact.content}
  </span>
  <div class="flex gap-1">
    <LabelPills labels={fact.labels} />
  </div>
</div>

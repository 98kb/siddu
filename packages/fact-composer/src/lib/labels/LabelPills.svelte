<script lang="ts">
  import {Badge} from "$lib/components/ui/badge";
  import {Button} from "$lib/components/ui/button";
  import type {Label} from "@repo/facts-db";
  import {XIcon} from "lucide-svelte";

  export let labels: Label[];
</script>

{#each labels as label (label.id)}
  <Badge variant="outline">
    <span class="inline-flex items-center relative">
      {label.name}
      <slot {label} />
    </span>
  </Badge>
{/each}

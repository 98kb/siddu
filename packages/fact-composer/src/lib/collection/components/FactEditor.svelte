<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
  import LabelPills from "$lib/labels/LabelPills.svelte";
  import type {InsertFact} from "@repo/facts-db";
  import {XIcon} from "lucide-svelte";

  export let fact: InsertFact;

  const removeLabel = (labelId: number) => {
    fact.labels = fact.labels.filter(label => label.id !== labelId);
  };
</script>

<div class="flex flex-col w-full h-full gap-4 px-3 py-4 border">
  <slot />
  <div class="flex gap-2">
    <LabelPills bind:labels={fact.labels} let:label>
      <Button
        size="icon-sm"
        variant="ghost"
        class="rounded-full"
        on:click={() => removeLabel(label.id)}
      >
        <XIcon class="w-3 h-3" />
      </Button>
    </LabelPills>
  </div>
  <UnstyledTextarea
    autofocus
    class="w-full py-4 px-1 min-h-[120px] grow"
    placeholder="Add a Fact..."
    bind:value={fact.content}
  />
</div>

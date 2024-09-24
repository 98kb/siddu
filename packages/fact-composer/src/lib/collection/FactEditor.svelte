<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import UnstyledTextarea from "$lib/components/ui/textarea/UnstyledTextarea.svelte";
  import SelectLabels from "$lib/labels/SelectLabels.svelte";
  import LabelPills from "$lib/labels/LabelPills.svelte";
  import type {Task} from "fp-ts/lib/Task";
  import type {InsertFact} from "@repo/facts-db";
  import {XIcon} from "lucide-svelte";

  export let fact: InsertFact;
  export let save: Task<void>;
  export let cancel: Task<void>;

  const removeLabel = (labelId: number) => {
    fact.labels = fact.labels.filter(label => label.id !== labelId);
  };
</script>

<div class="flex flex-col w-full gap-4 px-3 py-4 border">
  <div class="flex w-full">
    <div class="flex">
      <SelectLabels bind:selectedLabels={fact.labels} />
    </div>
    <div class="grow"></div>
    <Button variant="link" on:click={save}>Save</Button>
    <Button variant="link" on:click={cancel}>Cancel</Button>
  </div>
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

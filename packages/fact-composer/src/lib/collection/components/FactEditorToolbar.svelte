<script lang="ts">
  import {Button} from "$lib/components/ui/button";
  import SelectLabels from "$lib/labels/SelectLabels.svelte";
  import type {InsertFact} from "@repo/facts-db";
  import type {Task} from "fp-ts/lib/Task";
  import {ArchiveXIcon, TagIcon} from "lucide-svelte";
  import ToolbarButton from "./ToolbarButton.svelte";

  export let fact: InsertFact;
  export let onCreate: Task<void>;
  export let onSave: Task<void>;
  export let onClose: Task<void>;
  export let onArchive: Task<void>;

  $: handler = "id" in fact ? onSave : onCreate;
  $: saveLabel = "id" in fact ? "Save" : "Create";
</script>

<div class="flex w-full">
  <div class="flex">
    <SelectLabels bind:selectedLabels={fact.labels} let:builder let:open>
      <ToolbarButton
        builders={[builder]}
        tooltip="Add Label"
        role="combobox"
        aria-expanded={open}
      >
        <TagIcon class="h-4 w-4" />
      </ToolbarButton>
    </SelectLabels>
    {#if "id" in fact}
      <ToolbarButton tooltip="Archive" on:click={onArchive}>
        <ArchiveXIcon class="h-4 w-4" />
      </ToolbarButton>
    {/if}
  </div>
  <div class="grow"></div>
  <Button variant="link" on:click={handler}>{saveLabel}</Button>
  <Button variant="link" on:click={onClose}>Cancel</Button>
</div>

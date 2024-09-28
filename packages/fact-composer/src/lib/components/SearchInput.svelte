<script lang="ts">
  import {SearchIcon} from "lucide-svelte";
  import SelectLabels from "$lib/labels/SelectLabels.svelte";
  import ToolbarButton from "$lib/collection/components/ToolbarButton.svelte";
  import {ListFilterIcon, XIcon} from "lucide-svelte";
  import type {Label} from "@repo/facts-db";
  import LabelPills from "$lib/labels/LabelPills.svelte";
  import Button from "./ui/button/button.svelte";

  export let value: string;
  export let filterLabels: Label[];

  const removeLabel = (labelId: number) => {
    filterLabels = filterLabels.filter(label => label.id !== labelId);
  };
</script>

<div class="flex flex-col bg-background px-3 py-2 gap-2">
  <div class="flex items-center border gap-3 pl-3 focus-within:border-foreground">
    <SearchIcon size={16} class="text-foreground" />
    <input
      type="text"
      class="w-full focus:outline-none text-sm text-foreground"
      placeholder="Type to search..."
      bind:value
    />
    <SelectLabels bind:selectedLabels={filterLabels} let:builder let:open>
      <ToolbarButton
        builders={[builder]}
        tooltip="Filter"
        role="combobox"
        aria-expanded={open}
        side="left"
        sideOffset={5}
      >
        <ListFilterIcon class="h-4 w-4" />
      </ToolbarButton>
    </SelectLabels>
  </div>
  {#if filterLabels.length > 0}
    <div class="flex gap-2">
      <LabelPills labels={filterLabels} let:label>
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
  {/if}
</div>

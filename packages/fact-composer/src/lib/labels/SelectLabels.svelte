<script lang="ts">
  import Check from "svelte-radix/Check.svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import {Button} from "$lib/components/ui/button/index.js";
  import {cn} from "$lib/utils.js";
  import {TagIcon} from "lucide-svelte";
  import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import {labels} from "./store/labels";
  import type {Label} from "@repo/facts-db";
  import {injectDbClient} from "$lib/injectDbClient";

  const db = injectDbClient();
  export let selectedLabels: Label[];
  let open = false;
  let query = "";

  const selectLabel = (label: Label) => {
    const index = selectedLabels.findIndex(l => l.id === label.id);
    if (index !== -1) {
      selectedLabels.splice(index, 1);
    } else {
      selectedLabels.push(label);
    }
    selectedLabels = selectedLabels;
    open = false;
  };

  const isSelected = (label: Label) =>
    selectedLabels.some(l => l.id === label.id);

  const addAndSelectLabel = async () => {
    const id = await db.labels.add({name: query});
    selectLabel({id, name: query});
  };
</script>

<Popover.Root bind:open>
  <Popover.Trigger asChild let:builder>
    <Tooltip openDelay={10}>
      <TooltipTrigger>
        <Button
          builders={[builder]}
          variant="ghost"
          role="combobox"
          size="icon"
          aria-expanded={open}
          class="rounded-full"
        >
          <TagIcon class="h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <span class="capitalize">Add label</span>
      </TooltipContent>
    </Tooltip>
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input
        bind:value={query}
        placeholder="Search labels..."
        class="h-9"
      />
      <Command.Empty>
        <p>No labels found</p>
        <Button
          variant="ghost"
          size="sm"
          class="w-full justify-start"
          on:click={addAndSelectLabel}
        >
          Add "{query}"
        </Button>
      </Command.Empty>
      {#each $labels as label (label.id)}
        <Command.Item value={label.name} onSelect={() => selectLabel(label)}>
          <Check
            class={cn("mr-2 h-4 w-4", !isSelected(label) && "text-transparent")}
          />
          {label.name}
        </Command.Item>
      {/each}
    </Command.Root>
  </Popover.Content>
</Popover.Root>

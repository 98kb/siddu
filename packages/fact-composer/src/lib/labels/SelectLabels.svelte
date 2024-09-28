<script lang="ts">
  import Check from "svelte-radix/Check.svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import {Button} from "$lib/components/ui/button/index.js";
  import {cn} from "$lib/utils.js";
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
    <slot {builder} {open} />
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

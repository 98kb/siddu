<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import { element } from '../stores/element';
  import { isModalOpen } from "../stores/isModalOpen";

  $: notes = chrome.runtime.sendMessage({ type: "getAll" });
  const handleSelect = (note: { content: string }) => {
    const text = note.content;
    isModalOpen.set(false);
    if($element) {
      $element.value = [$element?.value, text].join(" ");
      $element.focus();
    }
  };
</script>

<Command.Dialog
  portal={null}
  bind:open={$isModalOpen}
>
  <Command.Input placeholder="Type to search..." />
  <Command.List>
    {#await notes then notes}
      {#each notes as note}
        <Command.Item
          onSelect={() => handleSelect(note)}
        >{note.content}</Command.Item>
      {/each}
    {/await}
  </Command.List>
</Command.Dialog>

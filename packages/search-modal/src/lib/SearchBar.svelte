<script lang="ts">
  import * as Command from "$lib/components/ui/command";
  import Modal from "./Modal.svelte";
  import { element } from '../stores/element';
  import { isModalOpen } from "../stores/isModalOpen";

  let value: string;
  let query: string;
  let text: string;
  $: notes = chrome.runtime.sendMessage({ type: "search", query });

  const handleSelect = (note: { content: string }) => {
    console.log('note', note);
    text = note.content;
    isModalOpen.set(false);
    if($element) {
      $element.value = [$element?.value, text].join(" ");
      $element.focus();
    }
  };
</script>

<Modal shouldFilter={false}>
  <!-- <Command.Root shouldFilter={false}> -->
    <Command.Input placeholder="Type a command or search..." />
    <Command.List>
      {#await notes then notes}
        {#each notes as note}
          <Command.Item
            onSelect={() => handleSelect(note)}
          >{note.content}</Command.Item>
        {/each}
      {/await}
    </Command.List>
  <!-- </Command.Root> -->
</Modal>

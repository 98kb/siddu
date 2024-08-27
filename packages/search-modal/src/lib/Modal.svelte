<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import {element} from "../stores/element";
  import {isModalOpen} from "../stores/isModalOpen";

  $: {
    if($isModalOpen === false && $element) {
      $element.focus();
      $element.value = `${$element?.value} ${Math.random()} \r\n`;
      $element = undefined;
    }
  }
</script>

<Dialog.Root bind:open={$isModalOpen}>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>

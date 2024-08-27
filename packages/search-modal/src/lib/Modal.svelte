<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import {element} from "../stores/element";
  import {isModalOpen} from "../stores/isModalOpen";

  let portal: HTMLDivElement;

  $: {
    if($isModalOpen === false && $element) {
      $element.focus();
      $element.value = [$element?.value, Math.random()].join(" ");
      $element = undefined;
    }
  }
</script>

<Dialog.Root
  {portal}
  bind:open={$isModalOpen}
  closeOnOutsideClick={false}
>
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

<div bind:this={portal} class="fixed z-[999999]"></div>

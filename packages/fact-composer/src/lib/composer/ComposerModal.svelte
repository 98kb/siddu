<script lang="ts">
  import "../../app.css";
  import {isModalOpen} from '$stores/isModalOpen';
  import {element, type InputElement} from '$stores/element';
  import { onMount } from "svelte";
  import CommandDialog from '$lib/components/ui/command/command-dialog.svelte';
  import Composition from './Composition.svelte';
  import type { ORM } from '@repo/facts-db';

  export let facts: ORM<"facts">;

  let open = false;
  let placeholder = "";
  let inputs: HTMLInputElement[] = [];
  let textareas: HTMLTextAreaElement[] = [];

  const openModal = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === ".") {
      isModalOpen.set(true);
      open = true;
      element.set(e.target as InputElement);
    }
  };

  const removeListeners = () => {
    for (const input of inputs) {
      input.removeEventListener("keydown", openModal);
    }
    for (const textarea of textareas) {
      textarea.removeEventListener("keydown", openModal);
    }
  };

  const addListeners = () => {
    inputs = Array.from(document.querySelectorAll("input") ?? []);
    textareas = Array.from(document.querySelectorAll("textarea") ?? []);
    for (const input of inputs) {
      input.addEventListener("keydown", openModal);
    }
    for (const textarea of textareas) {
      textarea.addEventListener("keydown", openModal);
    }
  };

  onMount(() => {
    addListeners();
    return removeListeners;
  });
</script>


<CommandDialog
  class="min-w-[66vw]"
  closeFocus={$element}
  closeOnOutsideClick={false}
  bind:value={placeholder}
  bind:open
>
  <Composition {facts} {placeholder} />
</CommandDialog>

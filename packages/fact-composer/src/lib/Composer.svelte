<script lang="ts">
  import {isModalOpen} from '../stores/isModalOpen';
  import {element, type InputElement} from '../stores/element';
  import SearchBar from "$lib/SearchBar.svelte";
  import { onMount } from "svelte";
  import type { FactsORM } from "@repo/facts-db";

  export let db: FactsORM;

  let inputs: HTMLInputElement[] = [];
  let textareas: HTMLTextAreaElement[] = [];

  const openModal = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key === ".") {
      isModalOpen.set(true);
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

<SearchBar {db} />

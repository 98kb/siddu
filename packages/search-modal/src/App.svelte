<script lang="ts">
  import "./app.css";
  import {isModalOpen} from './stores/isModalOpen';
  import {element, type InputElement} from './stores/element';
  import SearchBar from "$lib/SearchBar.svelte";
  import { onMount } from "svelte";

  const inputs = document.querySelectorAll("input");
  const textareas = document.querySelectorAll("textarea");

  console.log('inputs', inputs);


  const openModal = (e: KeyboardEvent) => {
    console.log('keypress');

    if (e.ctrlKey && e.key === ".") {
      isModalOpen.set(true);
      element.set(e.target as InputElement);
    }
  };

  for (const input of inputs) {
    input.addEventListener("keydown", openModal);
  }

  for (const textarea of textareas) {
    textarea.addEventListener("keydown", openModal);
  }

  onMount(() => {
    return () => {
      for (const input of inputs) {
        input.removeEventListener("keydown", openModal);
      }

      for (const textarea of textareas) {
        textarea.removeEventListener("keydown", openModal);
      }
    };
  });
</script>

<SearchBar />
